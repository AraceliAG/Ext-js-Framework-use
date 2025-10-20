Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'MiApp',

    appFolder: 'app',

    controllers: ['UsuarioController'],

    launch: function () {
        Ext.create('MiApp.view.Main', {
            renderTo: Ext.getBody()
        });
    }
});
