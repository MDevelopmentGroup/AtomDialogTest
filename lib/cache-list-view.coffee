{$, $$$, ScrollView} = require 'atom'


module.exports =
class CacheListView extends ScrollView
  @content: ->
    @div class: 'ask-stack-result native-key-bindings', =>
      @div "iksh edgsiughis", outlet: 'resultsView'

  initialize: ->
    atom.workspaceView.command "cache-modal-dialog:toggle2", => @toggle()
    #@render()
    super

  destroy: ->
    @unsubscribe()

  getTitle: ->
    'Cache Package List'

  getUri: ->
    'cache://list-view'

  getIconName: ->
    'three-bars'


  render : (ClassList) ->
    console.log (ClassList)
    list="<ul>"
    for item in ClassList
      list=list+"<li>"+item.Name+"</li>"
    list=list+"</ul>"

    @resultsView.html(list)
  toggle: ->
    if @hasParent()
      @detach()
    else
      atom.workspaceView.append(this)
