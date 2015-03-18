// METADATA ABOUT A WHOLE FORM
// --------------------

var formMetaData = {
  requiredMessage: 'Vänligen ange ',
  fields: [{
    title: 'personnummer',
    name: 'ssn',
    type: 'tel',
    help: 'Ange det personnummer som du vill ha din kivra kopplad till',
    format: 'ÅÅÅÅMMDDXXXX',
    required: 'true',
    patterns: [
      {
        regexp: '^[0-9]{6,8}[-|(s)]{0,1}[0-9]{4}$',
        message: 'Ange personnummer på formatet ÅÅÅÅMMDDXXXX'
      },{
        regexp: '^.{10-13}$',
        message: 'Personnummret måste vara mellan 10 och 13 tecken långt'
      }
    ]
  },{
    title: 'mobiltelefon',
    name: 'mobile',
    type: 'tel',
    help: 'Ange ditt telefonnummer',
    format: 'XXX-XXXXXXXX',
    required: 'true'
  }]
};

var colors = {
  info: 'rgb(154, 209, 75)',
  danger: 'rgb(200, 0, 0)'
};

// FEEDBACK ELEMENT
// ------------------

var InfoBar = React.createClass({
  
  render: function () {

    var style = {
      fontSize: 10,
      color: 'rgb(200, 200, 200)',
      visibility: (this.props.visible) ? 'visible' : 'hidden',
    };

    var infoEl = React.createElement('div', {style: style}, this.props.message);

    return infoEl;
  }
  
});

// INPUT ELEMENT
// -----------------

var InputField = React.createClass({

  getInitialState: function() {
    return {value: 'Hello!'};
  },

  handleChange: function (event) {
    this.setState({ value: event.target.value });
  },
  
  render: function () {

    var style = {
      width: '100%',
      outline: 'none',
      borderColor: 'transparent',
      fontSize: 20,
      padding: 10,
      boxSizing: 'border-box' 
    };

    var inputEl = React.createElement('input', {
      style: style,
      ref: 'input',
      placeholder: this.props.title,
      type: this.props.type,
      onChange: this.handleChange,
      onBlur: this.props.onBlur,
      onFocus: this.props.onFocus
    } , null);

    return inputEl;
  }
});

// A FIELD
// -------------

var FormField = React.createClass({

  getInitialState: function() {
    return {
      error: null,
      inFocus: false
    };
  },
  
  blur: function (event) {

    var error;
    var value =  this.refs.inputElement.refs.input.getDOMNode().value;
    
    try {
      this.props.patterns.forEach(function (pattern) {
        var regexp = new RegExp(pattern.regexp);
        error = null;
        if (!regexp.test(value)) {
          error = pattern.message;
        }
      });
    } catch (err) {
      error = null;
    }

    if (value === '') {
      error = this.props.requiredMessage + this.props.title;
    }

    this.setState({
      inFocus: false,
      error: error
    });

  },

  focus: function (event) {
    this.setState({
      inFocus: true,
      error: null
    });
  },
  
  render: function () {

    var labelStyle = {
      color: 'rgb(0, 0, 0)',
      fontSize: 10,
      fontWeight: 'bold',
      display: 'none' // only need this when placeholder isn't supported
    };

    var badgeType = (this.state.error) ? 'danger' : 'info';
    var isBadgeVisible = this.state.inFocus || this.state.error;
    
    var badgeStyle = {
      backgroundColor: colors[badgeType],
      width: 3,
      marginTop: 10,
      height: 30,
      left: 10,
      visibility: (isBadgeVisible) ? 'visible' : 'hidden',
      position: 'absolute'
    };
          

    var inputEl = React.createElement(InputField, {
      onBlur: this.blur,
      onFocus: this.focus,
      ref: 'inputElement',
      title: this.props.title,
      type: this.props.type
    });

    var labelEl = React.createElement('p', {style: labelStyle}, this.props.title);

    var badgeEl = React.createElement('div', {style: badgeStyle});
    
    var infoEl = React.createElement(InfoBar, {
      visible: this.state.inFocus || this.state.error,
      type: (this.state.error) ? 'danger' : 'info',
      message: (this.state.inFocus) ? this.props.help : this.state.error || ''
    });
    
    var fieldEl = React.createElement('div', null, [badgeEl, labelEl, inputEl, infoEl]);
    
    return fieldEl;
  }
});

// THE WHOLE FORM
// ------------

var Form = React.createClass({
  
  render: function () {

    var fields = [];
    var requiredMessage = this.props.requiredMessage;
    
    this.props.fields.forEach(function (part) {
      part.requiredMessage = requiredMessage;
      part.style = {
        marginBottom: 10
      };
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
