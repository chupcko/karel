function MachineClass(world)
{
  this.world = world;

  this.code = undefined;
  this.functionsTable = undefined;
  this.pc = undefined;
  this.stack = undefined;
  this.stopped = undefined;

  this.ResultBadAddress     = 'Bad address in machine';
  this.ResultBadInstruction = 'Bad instruction in machine';
  this.ResultBadPC          = 'Bad PC in machine';
  this.ResultBadDataInStack = 'Bad data in machine stack'
  this.ResultCannotMove     = 'Machine cannot do MOVE';
  this.ResultCannotPut      = 'Machine cannot do PUT';
  this.ResultCannotTake     = 'Machine cannot do TAKE';
  this.ResultEmptyStack     = 'Empty machine stack';
  this.ResultNoCode         = 'Not found code in machine, first compile';
  this.ResultStopped        = 'Machine is stopped';

  this.unSet = function()
  {
    this.code = undefined;
    this.functionsTable = undefined;
    this.pc = undefined;
    this.stack = undefined;
    this.stopped = undefined;
  };

  this.reset = function()
  {
    this.pc = 0;
    this.stack = [];
    this.stopped = false;
  };

  this.set = function(code, functionsTable)
  {
    this.code = code;
    this.functionsTable = [];
    for(var key in functionsTable)
      if(key != '$id' && key != '$name')
        this.functionsTable[functionsTable[key]] = key;
    this.reset();
  };

  this.pcIsBad = function()
  {
    if
    (
      this.code === undefined  ||
      this.pc < 0 ||
      this.pc >= this.code.length
    )
      return true;
    return false;
  };

  this.stop = function(what)
  {
    this.stopped = true;
    return what;
  }

  this.step = function()
  {
    if(this.code === undefined)
      return this.stop(this.ResultNoCode);
    if(this.stopped)
      return this.ResultStopped;
    if(this.pcIsBad())
      return this.stop(this.ResultBadPC);
    switch(this.code[this.pc])
    {
      case 'left':
        this.world.doLeft();
        this.pc++;
        break;
      case 'move':
        if(!this.world.doMove())
          return this.stop(this.ResultCannotMove);
        this.pc++;
        break;
      case 'put':
        if(!this.world.doPut())
          return this.stop(this.ResultCannotPut);
        this.pc++;
        break;
      case 'take':
        if(!this.world.doTake())
          return this.stop(this.ResultCannotTake);
        this.pc++;
        break;
      case 'stop':
        return this.stop(false);
        break;
      case 'jump':
        this.pc++;
        if(this.pcIsBad())
          return this.stop(this.ResultBadAddress);
        this.pc = this.code[this.pc];
        break;
      case 'call':
        this.pc++;
        if(this.pcIsBad())
          return this.stop(this.ResultBadAddress);
        this.stack.push({ type: 'address', data: this.pc+1 });
        this.pc = this.code[this.pc];
        break;
      case 'ret':
        var address = this.stack.pop();
        if(address === undefined)
          return this.stop(this.ResultEmptyStack);
        if(address.type != 'address')
          return this.stop(this.ResultBadDataInStack);
        this.pc = address.data;
        break;
      case 'bn':
        this.pc++;
        if(this.world.conditionNorth())
        {
          if(this.pcIsBad())
            return this.stop(this.ResultBadAddress);
          this.pc = this.code[this.pc];
        }
        else
          this.pc++;
        break;
      case 'bw':
        this.pc++;
        if(this.world.conditionWall())
        {
          if(this.pcIsBad())
            return this.stop(this.ResultBadAddress);
          this.pc = this.code[this.pc];
        }
        else
          this.pc++;
        break;
      case 'bh':
        this.pc++;
        if(this.world.conditionHave())
        {
          if(this.pcIsBad())
            return this.stop(this.ResultBadAddress);
          this.pc = this.code[this.pc];
        }
        else
          this.pc++;
        break;
      case 'bf':
        this.pc++;
        if(this.world.conditionFind())
        {
          if(this.pcIsBad())
            return this.stop(this.ResultBadAddress);
          this.pc = this.code[this.pc];
        }
        else
          this.pc++;
        break;
      case 'bnn':
        this.pc++;
        if(!this.world.conditionNorth())
        {
          if(this.pcIsBad())
            return this.stop(this.ResultBadAddress);
          this.pc = this.code[this.pc];
        }
        else
          this.pc++;
        break;
      case 'bnw':
        this.pc++;
        if(!this.world.conditionWall())
        {
          if(this.pcIsBad())
            return this.stop(this.ResultBadAddress);
          this.pc = this.code[this.pc];
        }
        else
          this.pc++;
        break;
      case 'bnh':
        this.pc++;
        if(!this.world.conditionHave())
        {
          if(this.pcIsBad())
            return this.stop(this.ResultBadAddress);
          this.pc = this.code[this.pc];
        }
        else
          this.pc++;
        break;
      case 'bnf':
        this.pc++;
        if(!this.world.conditionFind())
        {
          if(this.pcIsBad())
            return this.stop(this.ResultBadAddress);
          this.pc = this.code[this.pc];
        }
        else
          this.pc++;
        break;
      case 'rep':
        this.pc++;
        if(this.pcIsBad())
          return this.stop(this.ResultBadAddress);
        this.stack.push({ type: 'number', data: this.code[this.pc] });
        this.pc++;
        break;
      case 'next':
        this.pc++;
        var number = this.stack.pop()
        if(number === undefined)
          return this.stop(this.ResultEmptyStack);
        if(number.type != 'number')
          return this.stop(this.ResultBadDataInStack)
        if(number.data > 0)
        {
          this.stack.push({ type: 'number', data: number.data-1 });
          if(this.pcIsBad())
            return this.stop(this.ResultBadAddress);
          this.pc = this.code[this.pc];
        }
        else
          this.pc++;
        break;
      case 'pop':
        this.pc++;
        if(this.pcIsBad())
          return this.stop(this.ResultBadAddress);
        var number = this.code[this.pc];
        this.pc++;
        for(var i = 0; i < number; i++)
          if(this.stack.pop() === undefined)
            return this.stop(this.ResultEmptyStack);
        break;
      default:
        return this.stop(this.ResultBadInstruction);
    }
    return true;
  };
}
