{EditorView, Editor, View} = require 'atom'
#CacheNode = require ('sample_routines.js')

module.exports =
class CacheModalDialogView extends View
  @content: ->
    @div class: 'cache-modal-dialog overlay from-top', =>
      @div class: "panel", =>
        @h1 "NameSpace!", class: "panel-heading"
      @subview "NameSpace", new EditorView(mini:true, placeholderText: 'NameSpace')
      @subview "ClassName", new EditorView(mini:true, placeholderText: 'ClassName')
      @button "OK", id:'Button', class:'btn'



  initialize: (serializeState) ->
    @bind()
    atom.workspaceView.command "cache-modal-dialog:toggle", => @toggle()


  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @detach()

  toggle: ->
    console.log "CacheModalDialogView was toggled!"
    if @hasParent()
      @detach()
    else
      atom.workspaceView.append(this)
# Bind controls
  bind: ->
    @find('Button').on 'click', =>
      NameSpace=@NameSpace.getText()
      console.log(NameSpace)
      console.log(NameSpace)
