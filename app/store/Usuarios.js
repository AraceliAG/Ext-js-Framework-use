Ext.define('MiApp.store.Usuarios', {
    extend: 'Ext.data.Store',
    model: 'MiApp.model.Usuario',
    storeId: 'usuarios',
    autoLoad: true,
    autoSync: false,

    proxy: {
        type: 'rest',
        url: 'https://localhost:7185/api/usuarios',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        },
        listeners: {
            exception: function (proxy, response) {
                Ext.Msg.alert('Error', response.statusText);
            }
        }
    }
});
