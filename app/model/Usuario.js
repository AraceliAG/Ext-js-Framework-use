Ext.define('MiApp.model.Usuario', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre', 'email', 'edad', 'telefono'],
    idProperty: 'id'
});
