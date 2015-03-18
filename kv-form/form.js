// METADATA ABOUT A WHOLE FORM
// --------------------

var formMetaData = {
  fields: [{
    title: 'Personnummer',
    name: 'ssn',
    type: 'tel',
    help: 'Ange det personnummer som du vill ha din kivra kopplad till',
    format: 'ÅÅÅÅMMDDXXXX',
    required: 'true',
    patterns: [
      {
        pattern: '/^[0-9]{6,8}[-|(s)]{0,1}[0-9]{4}$/',
        message: 'Ange personnummer på formatet ÅÅÅÅMMDDXXXX'
      },
      {
        pattern: '/^.{10-13}$/',
        message: 'Personnummret måste vara mellan 10 och 13 tecken långt'
      }
    ]
  },{
    title: 'Mobiltelefon',
    name: 'mobile',
    type: 'tel',
    help: 'Ange ditt telefonnummer',
    format: 'XXX-XXXXXXXX',
    required: 'true',
    patterns: [
      {
        pattern: '/^[0-9]{6,8}[-|(s)]{0,1}[0-9]{4}$/',
        message: 'Ange personnummer på formatet ÅÅÅÅMMDDXXXX'
      },
      {
        pattern: '/^.{10-13}$/',
        message: 'Personnummret måste vara mellan 10 och 13 tecken långt'
      }
    ]
  }]
};

// EXTRA HELP/ERROR MESSAGE FOR INPUT FIELD
// ------------------

var InfoBar = React.createClass({
  
  render: function () {

    var style = {
      fontSize: 10,
      color: 'rgb(200, 200, 200)'
    };
    
    var infoEl = React.createElement('p', {style: style}, this.props);

    return infoEl;
  }
  
});

// INPUT FIELD FOR USER TO INPUT IN
// -----------------

var InputField = React.createClass({
  
  render: function () {

    var style = {
      width: '100%',
      outline: 'none',
      borderColor: 'transparent',
      borderBottom: 'rgb(154, 209, 75) 3px solid',
      fontSize: 20,
      padding: 10,
      paddingTop: 20,
      boxSizing: 'border-box' 
    };
    
    var inputEl = React.createElement('input', {
      style: style,
      placeholder: this.props.title,
      type: this.props.type
    } , null);

    return inputEl;
  }
});

// ONE FIELD IN A FORM
// -------------

var FormField = React.createClass({

  render: function () {

    var inputEl = React.createElement(InputField, this.props);
    var infoEl = React.createElement(InfoBar, this.props.help);
    
    var fieldEl = React.createElement('div', null, [inputEl, infoEl]);

    return fieldEl;
  }
});

// THE WHOLE FORM
// ------------

var Form = React.createClass({
  
  render: function () {

    var fields = [];

    this.props.fields.forEach(function (part) {
      var fieldEl = React.createElement(FormField, part);
      fields.push(fieldEl);
    });
                      
    var formEl = React.createElement('form', null, fields);
    
    return formEl;
  }
  
});
    
      
// CREATE THE FORM!
// --------------

React.render(
  React.createElement(Form, formMetaData),
  document.getElementById('kv-form')
);
