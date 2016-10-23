function MachineViewClass(machine, containerID)
{
  this.machine = machine;
  this.container = document.getElementById(containerID);
  this.oldPC = undefined;

  this.init = function()
  {
    if(this.machine.code === undefined)
    {
      this.container.innerHTML = 'Not yet compiled';
      return;
    }
    var text = '<div class="overflow"><div class="left"><table class="machine_view_code_table">';
    for(var i = 0; i < this.machine.code.length; i++)
    {
      text += '<tr id="'+this.$name()+'_code_row_'+i+'"><td class="machine_view_code_address_cell">';
      if(this.machine.addressFunctionTable[i] !== undefined)
        text += '['+this.machine.addressFunctionTable[i]+'] ';
      text += i+':</td><td class="machine_view_code_code_cell">'+this.machine.code[i]+'</td><td>';
      if(i+1 < this.machine.code.length && typeof this.machine.code[i+1] == 'number')
      {
        var functionName = this.machine.addressFunctionTable[this.machine.code[i+1]];
        if(this.machine.code[i] == this.machine.CodeCall && functionName !== undefined)
          text += '['+functionName+'] ';
        text += this.machine.code[i+1];
        i++;
      }
      else
        text += '&nbsp;';
      text += '</td></tr>';
    }
    text +=
      '</table></div><div class="left">'+
      'PC = <span id="'+this.$name()+'_pc" class="machine_view_data"></span><br/>'+
      'Stopped = <span id="'+this.$name()+'_stopped" class="machine_view_data"></span><br/>'+
      '<br/>'+
      'Stack (size = <span id="'+this.$name()+'_stack_size" class="machine_view_data"></span>):<div id="'+this.$name()+'_stack" class="machine_view_stack"></div>'+
      '</div></div>';
    this.container.innerHTML = text;
    this.oldPC = undefined;
  };

  this.draw = function()
  {
    if(this.machine.code === undefined)
      return;
    document.getElementById(this.$name()+'_pc').innerHTML = this.machine.pc;
    document.getElementById(this.$name()+'_stopped').innerHTML = this.machine.stopped;
    if(this.oldPC !== undefined)
      document.getElementById(this.$name()+'_code_row_'+this.oldPC).className = document.getElementById(this.$name()+'_code_row_'+this.oldPC).className.replace(' machine_view_code_pc_row', '');
    if(this.machine.pc !== undefined)
        document.getElementById(this.$name()+'_code_row_'+this.machine.pc).className += ' machine_view_code_pc_row';
    this.oldPC = this.machine.pc;

    document.getElementById(this.$name()+'_stack_size').innerHTML = this.machine.stack.length;
    if(this.machine.stack.length > 0)
    {
      var text = '';
      for(var i = this.machine.stack.length-1; i >= 0; i--)
        switch(this.machine.stack[i].type)
        {
          case this.machine.StackTypeNumber:
            text += '&nbsp;&nbsp;(number) '+this.machine.stack[i].data+'<br/>';
            break;
          case this.machine.StackTypeAddress:
            var functionAddress = this.machine.code[this.machine.stack[i].data-1];
            var functionName = undefined;
            if(typeof functionAddress == 'number')
              functionName = this.machine.addressFunctionTable[functionAddress];
            text += '&nbsp;&nbsp;(address) '+this.machine.stack[i].data;
            if(functionName !== undefined)
              text += ' ['+functionName+']';
            text += '<br/>';
            break;
        }
      document.getElementById(this.$name()+'_stack').innerHTML = text;
    }
    else
      document.getElementById(this.$name()+'_stack').innerHTML = '&nbsp;&nbsp;Empty<br/>';
  };

  this.init();
}
