{EditorView, SelectListView, Editor, View} = require 'atom'
CacheListView = require './cache-list-view'

module.exports =
class CacheModalDialogView extends View
  @content: ->
    @div class: 'cache-modal-dialog overlay from-top', =>
      @div class: "panel", =>
        @h1 "NameSpace!", class: "panel-heading"
      @subview "NameSpace", new EditorView(mini:true, placeholderText: 'NameSpace')
      @select "SelectNameSpace", class:'SelectNameSpace select selection',  =>
        @option 'H!'
        @option 'H2'
        @option 'H3'
      @subview "ClassName", new EditorView(mini:true, placeholderText: 'ClassName')
      @button "OK", outlet:'Button', class:'btn'



  initialize: (serializeState) ->
    @bind()
    atom.workspaceView.command "cache-modal-dialog:toggle", => @toggle()

    atom.workspace.registerOpener (uriToOpen) ->

      #console.log uriToOpen
      #try
      #  {protocol, host, pathname} = url.parse(uriToOpen)
      #  console.log host
      #catch error
      #  return
      #console.log (protocol)

      #return unless protocol is 'cache:'

      return new CacheListView()


  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @detach()

  toggle: ->
    if @hasParent()
      @detach()
    else
      atom.workspaceView.append(this)
# Bind controls
  bind: ->
    NameSpaceList =[
      {"Name":"%SYS" },
      {"Name":"SAMPLES" },
      {"Name":"DEV" },
      {"Name":"USER" }
    ]

    ClassList=[
      {"Name":"User.Test1"},
      {"Name":"User.Test2"},
      {"Name":"User.Test3"},
      {"Name":"User.Test4"},
      {"Name":"User.Test5"},
    ]

    @Button.on 'click', =>
      NameSpace=@NameSpace.getText()
      #console.log(NameSpaceList)
      @showResults(ClassList)





  showResults: (ClassList) ->

    uri = 'cache://list-view'

    atom.workspace.open(uri, split: 'right', searchAllPanes: true).done (cacheListView) ->
      @ClassList=[
        {"Name":"User.Test1"},
        {"Name":"User.Test2"},
        {"Name":"User.Test3"},
        {"Name":"User.Test4"},
        {"Name":"User.Test5"},
      ]
      cacheListView.render(@ClassList)
