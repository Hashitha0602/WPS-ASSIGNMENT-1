 $(function() {
  
  window.smLib = window.smLib || {};
  
  smLib.forms = smLib.forms || {
    anchorEl: $("<a>"),
    buttonEl: $("<input>").prop("type", "button"),
    checkboxEl: $("<input>").prop("type", "checkbox"),
    radioEl: $("<input>").prop("type", "radio"),
    textEl: $("<input>").prop("type", "text"),
    textareaEl: $("<textarea>"),
    fieldsetEl: $("<fieldset>"),
    labelEl: $("<label>"),
    spanEl: $("<span>"),
    divEl: $("<div>")
  };
  
  smLib.icons = smLib.icons || {
    addEl: smLib.forms.spanEl.clone().prop({
      "class": "glyphicon glyphicon-plus"
    }),
    removeEl: smLib.forms.spanEl.clone().prop({
      "class": "glyphicon glyphicon-minus"
    })
  };
  
  

  smLib.surveyForms = smLib.surveyForms || {

   
    addQuestion: function(container) {
      var that = this;
      this.container = container;
      var i = this.container.find(".question-container").length + 1;

      
      var newQuestionEl = smLib.forms.textEl.clone().prop({
        "name": "q" + i,
        "id": "q" + i,
        "class": "form-control"
      }).on("keyup", function(){
          that.updatePreview(newQuestion, newAnswerEl, previewContainerEl); 
        });
     
      var newQuestion = smLib.forms.divEl.clone().prop({
        "class": "question-pane"
      }).append("Question #"+i+": ", newQuestionEl);

      
      var newQTypeArr = [];
      var newQTypeRadioEl = smLib.forms.radioEl.clone().prop({
        name: "qType" + i,
        id: "qType" + i,
        value: "radio",
        class: "choices radiobox"
      }).on("click", function() {
        smLib.surveyForms.showOptionsPane(radioOptions);
      });
      newQTypeArr[0] = smLib.forms.labelEl.clone().append(newQTypeRadioEl, " Radio");

      var newQTypeCheckEl = smLib.forms.radioEl.clone().prop({
        name: "qType" + i,
        id: "qType" + i,
        value: "checkbox",
        class: "choices radiobox"
      }).on("click", function() {
        smLib.surveyForms.showOptionsPane(checkboxOptions);
      });
      newQTypeArr[1] = smLib.forms.labelEl.clone().append(newQTypeCheckEl, "Checkbox");

      var newQTypeTextEl = smLib.forms.radioEl.clone().prop({
        name: "qType" + i,
        id: "qType" + i,
        value: "text",
        class: "choices radiobox"
      }).on("click", function() {
        smLib.surveyForms.showOptionsPane(textOptions);
      });
      newQTypeArr[2] = smLib.forms.labelEl.clone().append(newQTypeTextEl, "Text");

      
      var addRadioChoiceButton = smLib.forms.buttonEl.clone().prop({
        "class": "btn btn-primary add-radio-choice answer-option",
        "value": "Add Radio button"
      }).append(smLib.icons.addEl.clone(), "Add choices").on("click", function() {
        that.addRadioOptions(radioOptions);
      });
      
      var radioOptions = smLib.forms.divEl.clone().prop({
        class: "radio-answer-options"
      }).data("control-type", "radio").append(addRadioChoiceButton).on("change", function(){
        that.updatePreview(newQuestion, newAnswerEl, previewContainerEl); 
      }).hide();
      this.addRadioOptions(radioOptions);

      var addCheckboxChoiceButton = smLib.forms.buttonEl.clone().prop({
        "class": "btn btn-primary add-checkbox-choice answer-option",
        "value": "Add Checkbox"
      }).append(smLib.icons.addEl.clone(), "Add choices").on("click", function() {
        that.addCheckboxOptions(checkboxOptions);
      });
      var checkboxOptions = smLib.forms.divEl.clone().prop({
        class: "checkbox-answer-options"
      }).append(addCheckboxChoiceButton).on("change", function(){
        that.updatePreview(newQuestion, newAnswerEl, previewContainerEl); 
      }).data("control-type", "checkbox").hide();
      this.addCheckboxOptions(checkboxOptions);

      var textOptions = smLib.forms.divEl.clone().prop({
        class: "text-answer-options"
      }).on("change", function(){
        that.updatePreview(newQuestion, newAnswerEl, previewContainerEl); 
      }).data("control-type", "text").hide();
      this.addTextOptions(textOptions);

      var newAnswerEl = smLib.forms.divEl.clone().prop({
        class: "answer-options-pane"
      }).append(radioOptions, checkboxOptions, textOptions);

     
      var newAnswer = smLib.forms.divEl.clone().prop({
        class: "answer-pane"
      }).append(newQTypeArr, newAnswerEl);
      
      
      var previewQuestion = smLib.forms.divEl.clone().prop({
        class: "preview-question"
      });
      var previewAnswer = smLib.forms.divEl.clone().prop({
        class: "preview-answer"
      })
      var previewContainerEl = smLib.forms.divEl.clone().prop({
        class: "preview-pane"
      }).on("click", function(){
        that.togglePreview(previewContainerEl);
      }).append(previewQuestion, previewAnswer).hide()
      
     
      var saveButton = smLib.forms.buttonEl.clone().prop({
        value: "Save question"
      }).on("click", function(){
        that.togglePreview(previewContainerEl);
      });
      var deleteButton = smLib.forms.buttonEl.clone().prop({
        value: "Remove queston"
      }).on("click", function(){
        if(confirm("Are you sure you want to remove this question? Action cannot be undone.") ){
          newQContainerEl.remove();
        }
      })
      var questionControls = smLib.forms.divEl.clone().prop({
        class: "controls-pane"
      }).append(saveButton, deleteButton);

      
      var newQContainerEl = smLib.forms.divEl.clone().prop({
        class: "question-container",
      }).append(newQuestion, newAnswer, previewContainerEl, questionControls);
      
      
      this.container.append(newQContainerEl);

    }, //end addQuestion()
    addRadioOptions: function(radioPane) {
      

      var radioChoice = radioPane.find(".radio-choice");
      var choice_c = radioChoice.length;

      var radioTempEl = smLib.forms.radioEl.clone().prop({
        "class": "answer-option radio-choice"
      });

      var radioChoiceTextEl = smLib.forms.textEl.clone().prop({
        "class": "form-control answer-option radio-choice radiochoice"+choice_c,
        "name": "radiochoice" + choice_c,
      });

      var radioChoiceEl = smLib.forms.labelEl.clone().append(radioTempEl, radioChoiceTextEl);
      
      radioPane.find(".add-radio-choice").before(radioChoiceEl);
    },
    addTextOptions: function(textPane) {
      this.textPane = textPane;

      var textChoiceTextEl = smLib.forms.textEl.clone().prop({
        "class": "form-control answer-option text-choice",
        "name": "text-placeholder",
      });

      var textChoiceEl = smLib.forms.labelEl.clone().append("Placeholder text: ", textChoiceTextEl);
      textPane.append(textChoiceEl);
    },
    addCheckboxOptions: function(checkboxPane) {
     

      var checkboxChoice = checkboxPane.find(".checkbox-choice");
      var choice_c = checkboxChoice.length;

      var checkboxTempEl = smLib.forms.checkboxEl.clone().prop({
        "class": "answer-option checkbox-choice"
      });
      var checkboxChoiceTextEl = smLib.forms.textEl.clone().prop({
        "class": "form-control answer-option checkbox-choice checkboxchoice"+choice_c,
        "name": "checkboxchoice" + choice_c,
      });

      var checkboxChoiceEl = smLib.forms.labelEl.clone().append(checkboxTempEl, checkboxChoiceTextEl);
      
      checkboxPane.find(".add-checkbox-choice").before(checkboxChoiceEl);
    },
    showOptionsPane: function(optionsPane) {
      
      if (optionsPane.not(":visible")) optionsPane.slideDown().siblings().slideUp();
    },
    updatePreview: function(questionPane, answerPane, previewPane){
      
      
      var previewQuestion = previewPane.find(".preview-question").empty();
      var previewAnswer = previewPane.find(".preview-answer").empty();
      
      var question = questionPane.text() + questionPane.find("input[type='text']").val();
      var answerOption = answerPane.find(":visible");
      var answers = answerOption.find("input[type='text']" );

      previewQuestion.text(question);

      switch(answerOption.data("control-type") ){
        case "radio":
          answers.each(function(){
            var labelText = $(this).val();
            var rbEl = smLib.forms.radioEl.clone();
            var answerLabelEl = smLib.forms.labelEl.clone()
                               .append(rbEl, labelText );
            previewAnswer.append(answerLabelEl);
          });
          break;
        case "checkbox":
          answers.each(function(){
            var cbEl = smLib.forms.checkboxEl.clone();
            var answerLabelEl = smLib.forms.labelEl.clone()
                               .append(cbEl, $(this).val() );
            previewAnswer.append(answerLabelEl);
          });
          break;
        case "text":
          answers.each(function(){
            var textblockEl = smLib.forms.textEl.clone().attr({
              placeholder: $(this).val()
            });
            previewAnswer.append(textblockEl);
          });
          break;
        }
    },
    togglePreview: function(previewPane){
      
      
      if(previewPane.is(":visible") ) {
        previewPane.hide().siblings().show();
      } else {
        previewPane.show().siblings().hide();
      }
    }
  };
});
