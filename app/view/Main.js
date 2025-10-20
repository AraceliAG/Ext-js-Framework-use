Ext.define('MiApp.view.Main', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usuariogrid',

    title: 'Usuarios Registrados',
    store: 'Usuarios',
    width: 700,
    height: 400,

    columns: [
        { text: 'ID', dataIndex: 'id', width: 50 },
        { text: 'Nombre', dataIndex: 'nombre', flex: 1 },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Edad', dataIndex: 'edad', width: 80 },
        { text: 'Teléfono', dataIndex: 'telefono', flex: 1 }
    ],

    tbar: [
        { text: 'Agregar Usuario', action: 'agregarUsuario' },
        { text: 'Editar Usuario', action: 'editarUsuario' },
        { text: 'Eliminar Usuario', action: 'eliminarUsuario' }
    ]
});
