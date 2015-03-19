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
        regexp: '^.{10,13}$',
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

var inputStates = {
  PRISTINE: 0,
  UNKNOWN: 1,
  WRONG: 2,
  CORRECT: 3
};

var userStates = {
  OUTSIDE: 0,
  INSIDE: 1,
  TYPING: 2
};

var colors = {
  neutral: 'rgb(200, 200, 200)',
  info: 'rgb(100, 100, 200)',
  correct: 'rgb(154, 209, 75)',
  danger: 'rgb(200, 0, 0)'
};

function getLineColor(input, user) {
  switch(input) {
  case inputStates.WRONG:
    return colors.danger;
  case inputStates.CORRECT:
    return colors.correct;
  case inputStates.UNKNOWN:
    return colors.neutral;
  default:
    return colors.neutral
  }
}

// FEEDBACK ELEMENT
// ------------------

var InfoBar = React.createClass({
  
  render: function () {

    var style = {
      fontSize: 10,
      color: 'rgb(200, 200, 200)',
      height: 15,
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
    // propagate up to field
    this.props.onChange();
  },
  
  render: function () {

    var style = {
      width: '100%',
      outline: 'none',
      borderColor: 'transparent',
      fontSize: 20,
      padding: 10,
      fontFamily: 'museo-sans',
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
      input: {
        state: inputStates.PRISTINE,
        message: null
      },
      user: userStates.OUTSIDE,
      inputLength: 0
    };
  },
  
  blur: function (event) {

    var value =  this.refs.inputElement.refs.input.getDOMNode().value;

    var newInputState = {
      state: inputStates.CORRECT,
      message: null
    };
    
    if (value === '') {
      newInputState = {
        state: inputStates.WRONG,
        message: this.props.requiredMessage + this.props.title
      };
    } else {
      try {
        this.props.patterns.forEach(function (pattern) {
          var regexp = new RegExp(pattern.regexp);
          if (!regexp.test(value)) {
            newInputState = {
              state: inputStates.WRONG,
              message: pattern.message
            };
          }
        });
      } catch (err) {
        newInputState.state = inputStates.CORRECT;
      }
    }

    // Update field
    this.setState({
      user: userStates.OUTSIDE,
      input: newInputState
    });

  },

  focus: function (event) {
    this.setState({
      user: userStates.INSIDE,
      input: {
        state: inputStates.UNKNOWN,
        message: this.props.help
      }
    });
  },

  typing: function (event) {
    var newLength = this.refs.inputElement.refs.input.getDOMNode().value.length;
    this.setState({
      inputLength: newLength
    });
  },
  
  render: function () {

    var userState = this.state.user;
    var input = this.state.input;
    
    var labelStyle = {
      color: 'rgb(0, 0, 0)',
      fontSize: 10,
      fontWeight: 'bold',
      display: 'none' // only need this when placeholder isn't supported
    };
      
    var lineStyle = {
      backgroundColor: getLineColor(input.state),
      width: 23+this.state.inputLength * 12,
      marginBottom: 10,
      borderRadius: 2,
      height: 2,
      left: 10
    };

    var inputEl = React.createElement(InputField, {
      onBlur: this.blur,
      onFocus: this.focus,
      onChange: this.typing,
      ref: 'inputElement',
      title: this.props.title,
      type: this.props.type
    });

    var labelEl = React.createElement('p', {style: labelStyle}, this.props.title);

    var lineEl = React.createElement('div', {style: lineStyle});
    
    var infoEl = React.createElement(InfoBar, {
      visible: true,
      message: input.message
    });
    
    var fieldEl = React.createElement('div', null, [labelEl, inputEl, lineEl, infoEl]);
    
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
