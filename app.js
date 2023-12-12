var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn"
  };
  return {
    getInput: function(){
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDomstrings:function(){
      return DOMstrings;
    }
  };
})();

var financeController = (function() {
  var Income = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var data ={
    items: {
      inc:[],
      exp:[]
    },
    totals:{
      inc: 0,
      exp:0
    }
  }
  return{
    addItem:function(type,desc,val){
      var item, id;
      if(data.items[type].length === 0) id = 1;
      else{
        id = data.items[type][data.items[type].length - 1].id + 1;
      }
      if(type === "inc"){
        item = new Income(id,desc,val);
      }
      else{
        item = new Expense(id,desc,val);
      }
      data.items[type].push(item);
      console.log("item added...");
      
    },
    seeData:function(){
      return data;
    }
  }
})();

var appController = (function(uiController, financeController) {
  

  var ctrlAddItem = function() {

    var input = uiController.getInput();
    // console.log(input);
    financeController.addItem(input.type,input.description,input.value);
  };
  var setupEventListeners = function() {
    var DOM = uiController.getDomstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function() {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return{
    init:function(){
      console.log('App started');
      setupEventListeners();
    }
  };
  
})(uiController, financeController);
appController.init();