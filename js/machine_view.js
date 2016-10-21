function MachineViewClass(machine, containerID)
{
  this.machine = machine;
  this.containerID = document.getElementById(containerID);
  this.oldPC = undefined;

  this.init = function()
  {
    if(this.machine.code === undefined)
    {
      this.containerID.innerHTML = 'Not yet compiled';
      return;
    }
    var text =
      '<div class="machine_view_overflow">'+
      '<div class="machine_view_code">'+
      '<table class="machine_view_code_table">';
    for(var i = 0; i < this.machine.code.length; i++)
    {
      text += '<tr id="'+this.$name()+'_code_row_'+i+'"><td class="machine_view_code_address_cell">';
      if(this.machine.functionsTable[i] !== undefined)
        text += '('+this.machine.functionsTable[i]+') ';
      text += i+':</td><td class="machine_view_code_code_cell">'+this.machine.code[i]+'</td><td>';
      if(i+1 < this.machine.code.length && typeof this.machine.code[i+1] == 'number')
      {
        if(this.machine.code[i] == 'call' && this.machine.functionsTable[this.machine.code[i+1]] !== undefined)
          text += '('+this.machine.functionsTable[this.machine.code[i+1]]+') ';
        text += this.machine.code[i+1];
        i++;
      }
      else
        text += '&nbsp;';
      text += '</td></tr>';
    }
    text +=
      '</table></div><div>'+
      'PC = <span id="'+this.$name()+'_pc" class="machine_view_data"></span><br/>'+
      'Stopped = <span id="'+this.$name()+'_stopped" class="machine_view_data"></span><br/>'+
      '<br/>'+
      'Stack:<div id="'+this.$name()+'_stack" class="machine_view_stack"></div>'+
      '</div></div>';
    this.containerID.innerHTML = text;
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

    if(this.machine.stack.length > 0)
    {
      var text = '';
      for(var i = 0; i < this.machine.stack.length; i++)
        text += '&nbsp;&nbsp;('+this.machine.stack[i].type+') '+this.machine.stack[i].data+'<br/>';
      document.getElementById(this.$name()+'_stack').innerHTML = text;
    }
    else
      document.getElementById(this.$name()+'_stack').innerHTML = '&nbsp;&nbsp;Empty<br/>';
  };

  this.init();
}
