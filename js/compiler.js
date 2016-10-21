function CompilerClass(machine)
{
  this.machine = machine;

  this.LexemeUnknown          = -1;
  this.LexemeEnd              =  0;
  this.LexemeExclamationMark  =  1;
  this.LexemeLeftBraces       =  2;
  this.LexemeLeftParentheses  =  3;
  this.LexemeRightBraces      =  4;
  this.LexemeRightParentheses =  5;
  this.LexemeSemicolon        =  6;
  this.LexemeNumber           =  7;
  this.LexemeName             =  8;
  this.LexemeElse             =  9;
  this.LexemeFind             = 10;
  this.LexemeHave             = 11;
  this.LexemeIf               = 12;
  this.LexemeLeft             = 13;
  this.LexemeMove             = 14;
  this.LexemeNorth            = 15;
  this.LexemePut              = 16;
  this.LexemeRepeat           = 17;
  this.LexemeReturn           = 18;
  this.LexemeStop             = 19;
  this.LexemeTake             = 20;
  this.LexemeWall             = 21;
  this.LexemeWhile            = 22;

  this.keyWordsTable =
  [
    { value: 'else',   lexeme: this.LexemeElse   },
    { value: 'find',   lexeme: this.LexemeFind   },
    { value: 'have',   lexeme: this.LexemeHave   },
    { value: 'if',     lexeme: this.LexemeIf     },
    { value: 'left',   lexeme: this.LexemeLeft   },
    { value: 'move',   lexeme: this.LexemeMove   },
    { value: 'name',   lexeme: this.LexemeName   },
    { value: 'north',  lexeme: this.LexemeNorth  },
    { value: 'put',    lexeme: this.LexemePut    },
    { value: 'repeat', lexeme: this.LexemeRepeat },
    { value: 'return', lexeme: this.LexemeReturn },
    { value: 'stop',   lexeme: this.LexemeStop   },
    { value: 'take',   lexeme: this.LexemeTake   },
    { value: 'wall',   lexeme: this.LexemeWall   },
    { value: 'while',  lexeme: this.LexemeWhile  }
  ];

  this.text = undefined;
  this.textPosition = undefined;
  this.textLine = undefined;
  this.textColumn = undefined;
  this.lexeme = undefined;
  this.lexemeValue = undefined;
  this.lexemeLine = undefined;
  this.lexemeColumn = undefined;

  this.ResultExceptedLeftParentheses        = 'Excepted "("';
  this.ResultExceptedRightParentheses       = 'Excepted ")"';
  this.ResultExceptedSemicolon              = 'Excepted ";"';
  this.ResultExceptedElseOrCommand          = 'Excepted "else" or &lt;command&gt;';
  this.ResultExceptedLeftBraces             = 'Excepted "{"';
  this.ResultExceptedRightBraces            = 'Excepted "}"';
  this.ResultExceptedCommand                = 'Excepted &lt;command&gt;';
  this.ResultExceptedCondition              = 'Excepted &lt;condition&gt;';
  this.ResultExceptedFucntionName           = 'Excepted &lt;function name&gt;';
  this.ResultExceptedNumber                 = 'Excepted &lt;number&gt;';
  this.ResultExceptedPositiveNumber         = 'Number must be positive';
  this.ResultExceptedAlreadyDefinedFunction = 'Function "{}" already defined';
  this.ResultExceptedUndefinedFunction      = 'Undefined call of "{}"';

  this.code = undefined;
  this.address = undefined;
  this.callsTable = undefined;
  this.functionsTable = undefined;
  this.nestedStackSize = undefined;

  this.addToCode = function(what)
  {
    var returnValue = this.address;
    this.code[this.address] = what;
    this.address++;
    return returnValue;
  };

  this.addToCallsTable = function(name, address, line, column)
  {
    this.callsTable.push({ name: name, address: address, line: line, column: column});
  };

  this.addToFunctionsTable = function(name, address)
  {
    if(this.functionsTable[name] !== undefined)
      return true;
    this.functionsTable[name] = address;
    return false;
  };

  this.nextTextPosition = function()
  {
    this.textPosition++;
    if(this.text.charAt(this.textPosition) == '\n')
    {
      this.textLine++;
      this.textColumn = 0;
    }
    else
      this.textColumn++;
  };

  this.loadLexeme = function()
  {
    this.lexeme = this.LexemeUnknown;
    this.lexemeValue = undefined;
    this.lexemeLine = this.textLine;
    this.lexemeColumn = this.textColumn;
    while
    (
      this.textPosition < this.text.length &&
      this.text.charAt(this.textPosition).match(/^[# \t\n]$/)
    )
    {
      if(this.text.charAt(this.textPosition) == '#')
      {
        this.nextTextPosition();
        while
        (
          this.textPosition < this.text.length &&
          this.text.charAt(this.textPosition) != '\n'
        )
          this.nextTextPosition();
      }
      this.nextTextPosition();
    }
    if(this.textPosition >= this.text.length)
      this.lexeme = this.LexemeEnd;
    else if(this.text.charAt(this.textPosition) == '!')
    {
      this.lexeme = this.LexemeExclamationMark;
      this.lexemeValue = '!';
      this.nextTextPosition();
    }
    else if(this.text.charAt(this.textPosition) == '{')
    {
      this.lexeme = this.LexemeLeftBraces;
      this.lexemeValue = '{';
      this.nextTextPosition();
    }
    else if(this.text.charAt(this.textPosition) == '(')
    {
      this.lexeme = this.LexemeLeftParenthesesns;
      this.lexemeValue = '(';
      this.nextTextPosition();
    }
    else if(this.text.charAt(this.textPosition) == '}')
    {
      this.lexeme = this.LexemeRightBraces;
      this.lexemeValue = '}';
      this.nextTextPosition();
    }
    else if(this.text.charAt(this.textPosition) == ')')
    {
      this.lexeme = this.LexemeRightParenthesesrens;
      this.lexemeValue = ')';
      this.nextTextPosition();
    }
    else if(this.text.charAt(this.textPosition) == ';')
    {
      this.lexeme = this.LexemeSemicolon;
      this.lexemeValue = ';';
      this.nextTextPosition();
    }
    else if(this.text.charAt(this.textPosition).match(/^[0-9]$/))
    {
      this.lexeme = this.LexemeNumber;
      this.lexemeValue = this.text.charAt(this.textPosition);
      this.nextTextPosition();
      while
      (
        this.textPosition < this.text.length &&
        this.text.charAt(this.textPosition).match(/^[0-9]$/)
      )
      {
        this.lexemeValue += this.text.charAt(this.textPosition);
        this.nextTextPosition();
      }
    }
    else if(this.text.charAt(this.textPosition).match(/^[a-zA-Z_]$/))
    {
      this.lexeme = this.LexemeName;
      this.lexemeValue = this.text.charAt(this.textPosition);
      this.nextTextPosition();
      while
      (
        this.textPosition < this.text.length &&
        this.text.charAt(this.textPosition).match(/^[a-zA-Z0-9_]$/)
      )
      {
        this.lexemeValue += this.text.charAt(this.textPosition);
        this.nextTextPosition();
      }
      for(var i = 0; i < this.keyWordsTable.length; i++)
        if(this.keyWordsTable[i].value == this.lexemeValue)
        {
          this.lexeme = this.keyWordsTable[i].lexeme;
          break;
        }
    }
  };

  this.makeResult = function(result)
  {
    return result+' at '+this.lexemeLine+':'+this.lexemeColumn;
  };

  this.parserElse = function(elseAddress)
  {
    switch(this.lexeme)
    {
      case this.LexemeElse:
        this.addToCode('jump');
        var toOutAddress = this.addToCode(-1);
        this.code[elseAddress] = this.address;
        this.loadLexeme();
        var result = this.parserStatment();
        if(result !== true)
          return result;
        this.code[toOutAddress] = this.address;
        break;
      case this.LexemeLeftBraces:
      case this.LexemeRightBraces:
      case this.LexemeSemicolon:
      case this.LexemeName:
      case this.LexemeIf:
      case this.LexemeLeft:
      case this.LexemeMove:
      case this.LexemePut:
      case this.LexemeRepeat:
      case this.LexemeReturn:
      case this.LexemeStop:
      case this.LexemeTake:
      case this.LexemeWhile:
        this.code[elseAddress] = this.address;
        break;
      default:
        return this.makeResult(this.ResultExceptedElseOrCommand);
    }
    return true;
  };

  this.parserCondition = function()
  {
    var flag = false;
    while(this.lexeme == this.LexemeExclamationMark)
    {
      flag = !flag;
      this.loadLexeme();
    }
    switch(this.lexeme)
    {
      case this.LexemeFind:
        if(flag)
          this.addToCode('bf');
        else
          this.addToCode('bnf');
        this.loadLexeme();
        break;
      case this.LexemeHave:
        if(flag)
          this.addToCode('bh');
        else
          this.addToCode('bnh');
        this.loadLexeme();
        break;
      case this.LexemeNorth:
        if(flag)
          this.addToCode('bn');
        else
          this.addToCode('bnn');
        this.loadLexeme();
        break;
      case this.LexemeWall:
        if(flag)
          this.addToCode('bw');
        else
          this.addToCode('bnw');
        this.loadLexeme();
        break;
      default:
        return this.makeResult(this.ResultExceptedCondition);
    }
    return true;
  };

  this.parserPrimitive = function()
  {
    switch(this.lexeme)
    {
      case this.LexemeLeft:
        this.addToCode('left');
        this.loadLexeme();
        break;
      case this.LexemeMove:
        this.addToCode('move');
        this.loadLexeme();
        break;
      case this.LexemePut:
        this.addToCode('put');
        this.loadLexeme();
        break;
      case this.LexemeTake:
        this.addToCode('take');
        this.loadLexeme();
        break;
      case this.LexemeReturn:
        if(this.nestedStackSize > 0)
        {
          this.addToCode('pop');
          this.addToCode(this.nestedStackSize);
        }
        this.addToCode('ret');
        this.loadLexeme();
        break;
      case this.LexemeStop:
        this.addToCode('stop');
        this.loadLexeme();
        break;
      case this.LexemeName:
        this.addToCode('call');
        this.addToCallsTable(this.lexemeValue, this.addToCode('-1'), this.lexemeLine, this.lexemeColumn);
        this.loadLexeme();
        if(this.lexeme != this.LexemeLeftParenthesesns)
          return this.makeResult(this.ResultExceptedLeftParentheses);
        this.loadLexeme();
        if(this.lexeme != this.LexemeRightParenthesesrens)
          return this.makeResult(this.ResultExceptedRightParentheses);
        this.loadLexeme();
        break;
      case semicolon:
        break;
      default:
        return this.makeResult(this.ResultExceptedCommand);
    }
    return true;
  };

  this.parserStatment = function()
  {
    var result;
    switch(this.lexeme)
    {
      case this.LexemeSemicolon:
      case this.LexemeName:
      case this.LexemeLeft:
      case this.LexemeMove:
      case this.LexemePut:
      case this.LexemeTake:
      case this.LexemeReturn:
      case this.LexemeStop:
        result = this.parserPrimitive();
        if(result !== true)
          return result;
        if(this.lexeme != this.LexemeSemicolon)
          return this.makeResult(this.ResultExceptedSemicolon);
        this.loadLexeme();
        break;
      case this.LexemeIf:
        this.loadLexeme();
        if(this.lexeme != this.LexemeLeftParenthesesns)
          return this.makeResult(this.ResultExceptedLeftParentheses);
        this.loadLexeme();
        result = this.parserCondition();
        if(result !== true)
          return result;
        var elseAddress = this.addToCode(-1);
        if(this.lexeme != this.LexemeRightParenthesesrens)
          return this.makeResult(this.ResultExceptedRightParentheses);
        this.loadLexeme();
        result = this.parserStatment();
        if(result !== true)
          return result;
        result = this.parserElse(elseAddress);
        if(result !== true)
          return result;
        break;
      case this.LexemeWhile:
        var loopAddress = this.address;
        this.loadLexeme();
        if(this.lexeme != this.LexemeLeftParenthesesns)
          return this.makeResult(this.ResultExceptedLeftParentheses);
        this.loadLexeme();
        result = this.parserCondition();
        if(result !== true)
          return result;
        var toOutAddress = this.addToCode(-1);
        if(this.lexeme != this.LexemeRightParenthesesrens)
          return this.makeResult(this.ResultExceptedRightParentheses);
        this.loadLexeme();
        result = this.parserStatment();
        if(result !== true)
          return result;
        this.addToCode('jump');
        this.addToCode(loopAddress);
        this.code[toOutAddress] = this.address;
        break;
      case this.LexemeRepeat:
        this.addToCode('rep');
        this.loadLexeme();
        if(this.lexeme != this.LexemeLeftParenthesesns)
          return this.makeResult(this.ResultExceptedLeftParentheses);
        this.loadLexeme();
        if(this.lexeme != this.LexemeNumber)
          return this.makeResult(this.ResultExceptedNumber);
        var number = parseInt(this.lexemeValue);
        if(number <= 0)
          return this.makeResult(this.ResultExceptedPositiveNumber);
        this.addToCode(number-1);
        var loopAddress = this.address;
        this.loadLexeme();
        if(this.lexeme != this.LexemeRightParenthesesrens)
          return this.makeResult(this.ResultExceptedRightParentheses);
        this.nestedStackSize++;
        this.loadLexeme();
        result = this.parserStatment();
        if(result !== true)
          return result;
        this.nestedStackSize--;
        this.addToCode('next');
        this.addToCode(loopAddress);
        break;
      case this.LexemeLeftBraces:
        result = this.parserBlock();
        if(result !== true)
          return result;
        break;
      default:
        return this.makeResult(this.ResultExceptedCommand);
    }
    return true;
  };

  this.parserList = function()
  {
    while
    (
      this.lexeme == this.LexemeLeftBraces ||
      this.lexeme == this.LexemeSemicolon ||
      this.lexeme == this.LexemeName ||
      this.lexeme == this.LexemeIf ||
      this.lexeme == this.LexemeLeft ||
      this.lexeme == this.LexemeMove ||
      this.lexeme == this.LexemePut ||
      this.lexeme == this.LexemeRepeat ||
      this.lexeme == this.LexemeReturn ||
      this.lexeme == this.LexemeStop ||
      this.lexeme == this.LexemeTake ||
      this.lexeme == this.LexemeWhile
    )
    {
      var result = this.parserStatment();
      if(result !== true)
        return result;
    }
    if(this.lexeme != this.LexemeRightBraces)
      return this.makeResult(this.ResultExceptedRightBraces);
    return true;
  };

  this.parserBlock = function()
  {
    if(this.lexeme != this.LexemeLeftBraces)
      return this.makeResult(this.ResultExceptedLeftBraces);
    this.loadLexeme();
    var result = this.parserList();
    if(result !== true)
      return result;
    if(this.lexeme != this.LexemeRightBraces)
      return this.makeResult(this.ResultExceptedRightBraces);
    this.loadLexeme();
    return true;
  };

  this.parserProgram = function()
  {
    while(this.lexeme == this.LexemeName)
    {
      if(this.addToFunctionsTable(this.lexemeValue, this.address))
        return this.makeResult(this.ResultExceptedAlreadyDefinedFunction.replace('{}', this.lexemeValue));
      this.loadLexeme();
      if(this.lexeme != this.LexemeLeftParenthesesns)
        return this.makeResult(this.ResultExceptedLeftParentheses);
      this.loadLexeme();
      if(this.lexeme != this.LexemeRightParenthesesrens)
        return this.makeResult(this.ResultExceptedRightParentheses);
      this.nestedStackSize = 0;
      this.loadLexeme();
      var result = this.parserBlock();
      if(result !== true)
        return result;
      this.addToCode('ret');
    }
    if(this.lexeme != this.LexemeEnd)
      return this.makeResult(this.ResultExceptedFucntionName);
    return true;
  };

  this.compile = function(text)
  {
    this.text = text;
    this.textPosition = 0;
    this.textLine = 1;
    this.textColumn = 1;

    this.code = [];
    this.address = 0;
    this.callsTable = [];
    this.functionsTable = [];

    this.machine.unSet();

    this.addToCode('call');
    this.addToCallsTable('main', this.addToCode(-1), undefined, undefined);
    this.addToCode('stop');

    this.loadLexeme();
    var result = this.parserProgram();
    if(result !== true)
      return result;

    for(var i = 0; i < this.callsTable.length; i++)
    {
      var address = this.functionsTable[this.callsTable[i].name];
      if(address === undefined)
      {
        var returnValue = this.ResultExceptedUndefinedFunction.replace('{}', this.callsTable[i].name);
        if
        (
          this.callsTable[i].lexemeLine !== undefined &&
          this.callsTable[i].lexemeColumn !== undefined
        )
          returnValue += ' at '+this.callsTable[i].line+':'+this.callsTable[i].column;
        return returnValue;
      }
      this.code[this.callsTable[i].address] = address;
    }
    this.machine.set(this.code, this.functionsTable);
    return true;
  };
}
