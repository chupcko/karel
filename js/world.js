function WorldClass(maxX, maxY)
{
  this.maxX = Math.max(maxX, 1);
  this.maxY = Math.max(maxY, 1);

  this.beepersNumber = undefined;
  this.wallsNorthSouth = undefined;
  this.wallsEastWest = undefined;
  this.karelX = undefined;
  this.karelY = undefined;
  this.karelDirection = undefined;
  this.karelBeepersNumber = undefined;

  this.copiedData = undefined;

  this.DirectionNorth = 0;
  this.DirectionWest  = 1;
  this.DirectionSouth = 2;
  this.DirectionEast  = 3;

  this.reset = function()
  {
    this.beepersNumber = new Array();
    for(var x = 0; x < this.maxX; x++)
    {
      this.beepersNumber[x] = new Array();
      for(var y = 0; y < this.maxY; y++)
        this.beepersNumber[x][y] = 0;
    }
    this.wallsNorthSouth = new Array();
    for(var x = 0; x < this.maxX; x++)
    {
      this.wallsNorthSouth[x] = new Array();
      for(var y = 0; y < this.maxY-1; y++)
        this.wallsNorthSouth[x][y] = false;
    }
    this.wallsEastWest = new Array();
    for(var x = 0; x < this.maxX-1; x++)
    {
      this.wallsEastWest[x] = new Array();
      for(var y = 0; y < this.maxY; y++)
        this.wallsEastWest[x][y] = false;
    }
    this.karelX = 0;
    this.karelY = 0;
    this.karelDirection = this.DirectionNorth;
    this.karelBeepersNumber = 0;
  };

  this.existWallDataOnNorth = function(x, y)
  {
    return (
      x >= 0 &&
      x < this.maxX &&
      y >= 0 &&
      y < this.maxY-1
    );
  };

  this.existWallDataOnWest = function(x, y)
  {
    return (
      x >= 1 &&
      x < this.maxX &&
      y >= 0 &&
      y < this.maxY
    );
  };

  this.existWallDataOnSouth = function(x, y)
  {
    return (
      x >= 0 &&
      x < this.maxX &&
      y >= 1 &&
      y < this.maxY
    );
  };

  this.existWallDataOnEast = function(x, y)
  {
    return (
      x >= 0 &&
      x < this.maxX-1 &&
      y >= 0 &&
      y < this.maxY
    );
  };

  this.existField = function(x, y)
  {
    return (
      x >= 0 &&
      x < this.maxX &&
      y >= 0 &&
      y < this.maxY
    );
  };

  this.isWallOnNorth = function(x, y)
  {
    if(this.existWallDataOnNorth(x, y))
      return this.wallsNorthSouth[x][y];
    return true;
  };

  this.isWallOnWest = function(x, y)
  {
    if(this.existWallDataOnWest(x, y))
      return this.wallsEastWest[x-1][y];
    return true;
  };

  this.isWallOnSouth = function(x, y)
  {
    if(this.existWallDataOnSouth(x, y))
      return this.wallsNorthSouth[x][y-1];
    return true;
  };

  this.isWallOnEast = function(x, y)
  {
    if(this.existWallDataOnEast(x, y))
      return this.wallsEastWest[x][y];
    return true;
  };

  this.isWall = function(x, y, direction)
  {
    switch(direction)
    {
      case this.DirectionNorth:
        return this.isWallOnNorth(x, y);
        break;
      case this.DirectionWest:
        return this.isWallOnWest(x, y);
        break;
      case this.DirectionSouth:
        return this.isWallOnSouth(x, y);
        break;
      case this.DirectionEast:
        return this.isWallOnEast(x, y);
        break;
    }
    return false;
  };

  this.getBeepersNumber = function(x, y)
  {
    if(this.existField(x, y))
      return this.beepersNumber[x][y];
    return 0;
  };

  this.setWallOnNorth = function(x, y, wall)
  {
    if(this.existWallDataOnNorth(x, y))
      this.wallsNorthSouth[x][y] = wall;
  };

  this.setWallOnWest = function(x, y, wall)
  {
    if(this.existWallDataOnWest(x, y))
      this.wallsEastWest[x-1][y] = wall;
  };

  this.setWallOnSouth = function(x, y, wall)
  {
    if(this.existWallDataOnSouth(x, y))
      this.wallsNorthSouth[x][y-1] = wall;
  };

  this.setWallOnEast = function(x, y, wall)
  {
    if(this.existWallDataOnEast(x, y))
      this.wallsEastWest[x][y] = wall;
  };

  this.setWall = function(x, y, direction, wall)
  {
    switch(direction)
    {
      case this.DirectionNorth:
        this.setWallOnNorth(x, y, wall);
        break;
      case this.DirectionWest:
        this.setWallOnWest(x, y, wall);
        break;
      case this.DirectionSouth:
        this.setWallOnSouth(x, y, wall);
        break;
      case this.DirectionEast:
        this.setWallOnEast(x, y, wall);
        break;
    }
  };

  this.buildWallOnNorth = function(x, y)
  {
    this.setWallOnNorth(x, y, true);
  };

  this.buildWallOnWest = function(x, y)
  {
    this.setWallOnWest(x, y, true);
  };

  this.buildWallOnSouth = function(x, y)
  {
    this.setWallOnSouth(x, y, true);
  };

  this.buildWallOnEast = function(x, y)
  {
    this.setWallOnEast(x, y, true);
  };

  this.buildWall = function(x, y, direction)
  {
    this.setWall(x, y, direction, true);
  };

  this.destroyWallOnNorth = function(x, y)
  {
    this.setWallOnNorth(x, y, false);
  };

  this.destroyWallOnWest = function(x, y)
  {
    this.setWallOnWest(x, y, false);
  };

  this.destroyWallOnSouth = function(x, y)
  {
    this.setWallOnSouth(x, y, false);
  };

  this.destroyWallOnEast = function(x, y)
  {
    this.setWallOnEast(x, y, false);
  };

  this.destroyWall = function(x, y, direction)
  {
    this.setWall(x, y, direction, false);
  };

  this.toggleWallOnNorth = function(x, y)
  {
    if(this.existWallDataOnNorth(x, y))
      this.wallsNorthSouth[x][y] = !this.wallsNorthSouth[x][y];
  };

  this.toggleWallOnWest = function(x, y)
  {
    if(this.existWallDataOnWest(x, y))
      this.wallsEastWest[x-1][y] = !this.wallsEastWest[x-1][y];
  };

  this.toggleWallOnSouth = function(x, y)
  {
    if(this.existWallDataOnSouth(x, y))
      this.wallsNorthSouth[x][y-1] = !this.wallsNorthSouth[x][y-1];
  };

  this.toggleWallOnEast = function(x, y)
  {
    if(this.existWallDataOnEast(x, y))
      this.wallsEastWest[x][y] = !this.wallsEastWest[x][y];
  };

  this.toggleWall = function(x, y, direction)
  {
    switch(direction)
    {
      case this.DirectionNorth:
        this.toggleWallOnNorth(x, y);
        break;
      case this.DirectionWest:
        this.toggleWallOnWest(x, y);
        break;
      case this.DirectionSouth:
        this.toggleWallOnSouth(x, y);
        break;
      case this.DirectionEast:
        this.toggleWallOnEast(x, y);
        break;
    }
  };

  this.setBeepersNumber = function(x, y, beepersNumber)
  {
    if
    (
      this.existField(x, y) &&
      beepersNumber >= 0
    )
    this.beepersNumber[x][y] = beepersNumber;
  };

  this.decrementBeepersNumber = function(x, y)
  {
    if
    (
      this.existField(x, y) &&
      this.beepersNumber[x][y] > 0
    )
      this.beepersNumber[x][y]--;
  };

  this.incrementBeepersNumber = function(x, y)
  {
    if(this.existField(x, y))
      this.beepersNumber[x][y]++;
  };

  this.setKarelPosition = function(x, y)
  {
    if(this.existField(x, y))
    {
      this.karelX = x;
      this.karelY = y;
    }
  };

  this.setKarelDirectionToNorth = function()
  {
    this.karelDirection = this.DirectionNorth;
  };

  this.setKarelDirectionToWest = function()
  {
    this.karelDirection = this.DirectionWest;
  };

  this.setKarelDirectionToSouth = function()
  {
    this.karelDirection = this.DirectionSouth;
  };

  this.setKarelDirectionToEast = function()
  {
    this.karelDirection = this.DirectionEast;
  };

  this.setKarelDirection = function(direction)
  {
    switch(direction)
    {
      case this.DirectionNorth:
        this.setKarelDirectionToNorth();
        break;
      case this.DirectionWest:
        this.setKarelDirectionToWest();
        break;
      case this.DirectionSouth:
        this.setKarelDirectionToSouth();
        break;
      case this.DirectionEast:
        this.setKarelDirectionToEast();
        break;
    }
  };

  this.setKarelBeepersNumber = function(beepersNumber)
  {
    if(beepersNumber >= 0)
      this.karelBeepersNumber = beepersNumber;
  };

  this.decrementKarelBeepersNumber = function()
  {
    if(this.karelBeepersNumber > 0)
      this.karelBeepersNumber--;
  };

  this.incrementKarelBeepersNumber = function()
  {
    this.karelBeepersNumber++;
  };

  this.conditionNorth = function()
  {
    return this.karelDirection == this.DirectionNorth;
  };

  this.conditionWall = function()
  {
    return this.isWall(this.karelX, this.karelY, this.karelDirection);
  };

  this.conditionHave = function()
  {
    return this.karelBeepersNumber != 0;
  };

  this.conditionFind = function()
  {
    return this.beepersNumber[this.karelX][this.karelY] != 0;
  };

  this.doLeft = function()
  {
    switch(this.karelDirection)
    {
      case this.DirectionNorth:
        this.karelDirection = this.DirectionWest;
        break;
      case this.DirectionWest:
        this.karelDirection = this.DirectionSouth;
        break;
      case this.DirectionSouth:
        this.karelDirection = this.DirectionEast;
        break;
      case this.DirectionEast:
        this.karelDirection = this.DirectionNorth;
        break;
    }
  };

  this.doMove = function()
  {
    if(this.conditionWall())
      return false;
    switch(this.karelDirection)
    {
      case this.DirectionNorth:
        this.karelY++;
        break;
      case this.DirectionWest:
        this.karelX--;
        break;
      case this.DirectionSouth:
        this.karelY--;
        break;
      case this.DirectionEast:
        this.karelX++;
        break;
    }
    return true;
  };

  this.doPut = function()
  {
    if(!this.conditionHave())
      return false;
    this.karelBeepersNumber--;
    this.beepersNumber[this.karelX][this.karelY]++;
    return true;
  };

  this.doTake = function()
  {
    if(!this.conditionFind())
      return false;
    this.beepersNumber[this.karelX][this.karelY]--;
    this.karelBeepersNumber++;
    return true;
  };

  this.loadCopiedData = function()
  {
    if(this.copiedData === undefined)
    {
      this.reset();
      return;
    }
    this.beepersNumber = new Array();
    for(var x = 0; x < this.maxX; x++)
      this.beepersNumber[x] = this.copiedData.beepersNumber[x].slice();
    this.wallsNorthSouth = new Array();
    for(var x = 0; x < this.maxX; x++)
      this.wallsNorthSouth[x] = this.copiedData.wallsNorthSouth[x].slice();
    this.wallsEastWest = new Array();
    for(var x = 0; x < this.maxX-1; x++)
      this.wallsEastWest[x] = this.copiedData.wallsEastWest[x].slice();
    this.karelX = this.copiedData.karelX;
    this.karelY = this.copiedData.karelY;
    this.karelDirection = this.copiedData.karelDirection;
    this.karelBeepersNumber = this.copiedData.karelBeepersNumber;
  };

  this.saveCopiedData = function()
  {
    this.copiedData =
    {
      'beepersNumber':      undefined,
      'wallsNorthSouth':    undefined,
      'wallsEastWest':      undefined,
      'karelX':             this.karelX,
      'karelY':             this.karelY,
      'karelDirection':     this.karelDirection,
      'karelBeepersNumber': this.karelBeepersNumber
    };
    this.copiedData.beepersNumber = new Array();
    for(var x = 0; x < this.maxX; x++)
      this.copiedData.beepersNumber[x] = this.beepersNumber[x].slice();
    this.copiedData.wallsNorthSouth = new Array();
    for(var x = 0; x < this.maxX; x++)
      this.copiedData.wallsNorthSouth[x] = this.wallsNorthSouth[x].slice();
    this.copiedData.wallsEastWest = new Array();
    for(var x = 0; x < this.maxX-1; x++)
      this.copiedData.wallsEastWest[x] = this.wallsEastWest[x].slice();
  };

  this.load = function(data)
  {
    if(data.hasOwnProperty('beepersNumber') === false)
      return 'missing beepersNumber';
    if(Array.isArray(data.beepersNumber) !== true && data.beepersNumber.length != this.maxX)
      return 'bad beepersNumber';
    for(var x = 0; x < this.maxX; x++)
    {
      if(Array.isArray(data.beepersNumber[x]) !== true && data.beepersNumber[x].length != this.maxY)
        return 'bad beepersNumber element';
      for(var y = 0; y < this.maxY; y++)
      {
        if(typeof this.beepersNumber[x][y] != 'number')
          return 'bad beepersNumber item';
        this.beepersNumber[x][y] |= 0;
        if(this.beepersNumber[x][y] < 0)
          return 'bad beepersNumber item value';
      }
    }

    if(data.hasOwnProperty('wallsNorthSouth') === false)
      return 'missing wallsNorthSouth';
    if(Array.isArray(data.wallsNorthSouth) !== true && data.wallsNorthSouth.length != this.maxX)
      return 'bad wallsNorthSouth';
    for(var x = 0; x < this.maxX; x++)
    {
      if(Array.isArray(data.wallsNorthSouth[x]) !== true && data.beepersNumber[x].length != this.maxY-1)
        return 'bad wallsNorthSouth element';
      for(var y = 0; y < this.maxY-1; y++)
        if(typeof this.wallsNorthSouth[x][y] != 'boolean')
          return 'bad wallsNorthSouth item';
    }

    if(data.hasOwnProperty('wallsEastWest') === false)
      return 'missing wallsEastWest';
    if(Array.isArray(data.wallsEastWest) !== true && data.wallsEastWest.length != this.maxX-1)
      return 'bad wallsEastWest';
    for(var x = 0; x < this.maxX-1; x++)
    {
      if(Array.isArray(data.wallsEastWest[x]) !== true && data.wallsEastWest[x].length != this.maxY)
        return 'bad wallsEastWest element';
      for(var y = 0; y < this.maxY; y++)
        if(typeof this.wallsEastWest[x][y] != 'boolean')
          return 'bad wallsEastWest item';
    }

    if(data.hasOwnProperty('karelX') === false)
      return 'missing karelX';
    if(typeof data.karelX != 'number')
      return 'bad karelX';
    data.karelX |= 0;
    if(data.karelX < 0 || data.karelX >= this.maxX)
      return 'bad karelX value';

    if(data.hasOwnProperty('karelY') === false)
      return 'missing karelY';
    if(typeof data.karelX != 'number')
      return 'bad karelY';
    data.karelY |= 0;
    if(data.karelY < 0 || data.karelY >= this.maxY)
      return 'bad karelY value';

    if(data.hasOwnProperty('karelDirection') === false)
      return 'missing karelDirection';
    if(typeof data.karelDirection != 'number')
      return 'bad karelDirection';
    data.karelDirection |= 0;
    if
    (
      data.karelDirection != this.DirectionNorth &&
      data.karelDirection != this.DirectionWest &&
      data.karelDirection != this.DirectionSouth &&
      data.karelDirection != this.DirectionEast
    )
      return 'bad karelDirection value';

    if(data.hasOwnProperty('karelBeepersNumber') === false)
      return 'missing karelBeepersNumber';
    if(typeof data.karelBeepersNumber != 'number')
      return 'bad karelBeepersNumber';
    data.karelBeepersNumber |= 0;
    if(data.karelBeepersNumber < 0)
      return 'bad karelBeepersNumber value';

    this.copiedData = data;
    this.loadCopiedData();
    return true;
  };

  this.save = function()
  {
    this.saveCopiedData();
    return this.copiedData;
  };

  this.reset();
}
