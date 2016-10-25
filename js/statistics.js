function StatisticsClass()
{
  this.countTick = undefined;
  this.countDoLeft = undefined;
  this.countDoMove = undefined;
  this.countDoPut = undefined;
  this.countDoTake = undefined;
  this.countTestNorth = undefined;
  this.countTestWall = undefined;
  this.countTestHave = undefined;
  this.countTestFind = undefined;
  this.countCall = undefined;

  this.reset = function()
  {
    this.countTick = 0;
    this.countDoLeft = 0;
    this.countDoMove = 0;
    this.countDoPut = 0;
    this.countDoTake = 0;
    this.countTestNorth = 0;
    this.countTestWall = 0;
    this.countTestHave = 0;
    this.countTestFind = 0;
    this.countCall = 0;
  };

  this.reset();
}
