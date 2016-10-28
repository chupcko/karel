function MachineClass(world, statistics)
{
  this.world = world;
  this.statistics = statistics;

  this.code = undefined;
  this.addressFunctionTable = undefined;
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

  this.CodeLeft = 'left';
  this.CodeMove = 'move';
  this.CodePut  = 'put';
  this.CodeTake = 'take';
  this.CodeStop = 'stop';
  this.CodeJump = 'jump';
  this.CodeCall = 'call';
  this.CodeRet  = 'ret';
  this.CodeBn   = 'bn';
  this.CodeBw   = 'bw';
  this.CodeBh   = 'bh';
  this.CodeBf   = 'bf';
  this.CodeBnn  = 'bnn';
  this.CodeBnw  = 'bnw';
  this.CodeBnh  = 'bnh';
  this.CodeBnf  = 'bnf';
  this.CodeRep  = 'rep';
  this.CodeNext = 'next';
  this.CodePop  = 'pop';

  this.StackTypeNumber  = 1;
  this.StackTypeAddress = 2;

  this.unSet = function()
  {
    this.code = undefined;
    this.addressFunctionTable = undefined;
    this.pc = undefined;
    this.stack = undefined;
    this.stopped = undefined;
  };

  this.reset = function()
  {
    this.pc = 0;
    this.stack = [];
    this.stopped = false;
    this.statistics.reset();
  };

  this.set = function(code, addressFunctionTable)
  {
    this.code = code;
    this.addressFunctionTable = addressFunctionTable;
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
    this.statistics.counterTick++;
    if(this.code === undefined)
      return this.stop(this.ResultNoCode);
    if(this.stopped)
      return this.ResultStopped;
    if(this.pcIsBad())
      return this.stop(this.ResultBadPC);
    switch(this.code[this.pc])
    {
      case this.CodeLeft:
        this.statistics.counterDoLeft++;
        this.world.doLeft();
        this.pc++;
        break;
      case this.CodeMove:
        this.statistics.counterDoMove++;
        if(!this.world.doMove())
          return this.stop(this.ResultCannotMove);
        this.pc++;
        break;
      case this.CodePut:
        this.statistics.counterDoPut++;
        if(!this.world.doPut())
          return this.stop(this.ResultCannotPut);
        this.pc++;
        break;
      case this.CodeTake:
        this.statistics.counterDoTake++;
        if(!this.world.doTake())
          return this.stop(this.ResultCannotTake);
        this.pc++;
        break;
      case this.CodeStop:
        return this.stop(false);
        break;
      case this.CodeJump:
        this.pc++;
        if(this.pcIsBad())
          return this.stop(this.ResultBadAddress);
        this.pc = this.code[this.pc];
        break;
      case this.CodeCall:
        this.statistics.counterCall++;
        this.pc++;
        if(this.pcIsBad())
          return this.stop(this.ResultBadAddress);
        this.stack.push({ type: this.StackTypeAddress, data: this.pc+1 });
        this.pc = this.code[this.pc];
        break;
      case this.CodeRet:
        var address = this.stack.pop();
        if(address === undefined)
          return this.stop(this.ResultEmptyStack);
        if(address.type != this.StackTypeAddress)
          return this.stop(this.ResultBadDataInStack);
        this.pc = address.data;
        break;
      case this.CodeBn:
        this.statistics.counterTestNorth++;
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
      case this.CodeBw:
        this.statistics.counterTestWall++;
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
      case this.CodeBh:
        this.statistics.counterTestHave++;
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
      case this.CodeBf:
        this.statistics.counterTestFind++;
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
      case this.CodeBnn:
        this.statistics.counterTestNorth++;
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
      case this.CodeBnw:
        this.statistics.counterTestWall++;
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
      case this.CodeBnh:
        this.statistics.counterTestHave++;
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
      case this.CodeBnf:
        this.statistics.counterTestFind++;
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
      case this.CodeRep:
        this.pc++;
        if(this.pcIsBad())
          return this.stop(this.ResultBadAddress);
        this.stack.push({ type: this.StackTypeNumber, data: this.code[this.pc] });
        this.pc++;
        break;
      case this.CodeNext:
        this.pc++;
        var number = this.stack.pop()
        if(number === undefined)
          return this.stop(this.ResultEmptyStack);
        if(number.type != this.StackTypeNumber)
          return this.stop(this.ResultBadDataInStack)
        if(number.data > 0)
        {
          this.stack.push({ type: this.StackTypeNumber, data: number.data-1 });
          if(this.pcIsBad())
            return this.stop(this.ResultBadAddress);
          this.pc = this.code[this.pc];
        }
        else
          this.pc++;
        break;
      case this.CodePop:
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
