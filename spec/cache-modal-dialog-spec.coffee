{WorkspaceView} = require 'atom'
CacheModalDialog = require '../lib/cache-modal-dialog'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "CacheModalDialog", ->
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('cache-modal-dialog')

  describe "when the cache-modal-dialog:toggle event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.cache-modal-dialog')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.workspaceView.trigger 'cache-modal-dialog:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('.cache-modal-dialog')).toExist()
        atom.workspaceView.trigger 'cache-modal-dialog:toggle'
        expect(atom.workspaceView.find('.cache-modal-dialog')).not.toExist()
