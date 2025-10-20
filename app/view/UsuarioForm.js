Ext.define('MiApp.view.UsuarioForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.usuarioform',

    bodyPadding: 10,
    defaults: {
        anchor: '100%',
        allowBlank: false
    },

    items: [
        { xtype: 'textfield', name: 'nombre', fieldLabel: 'Nombre' },
        { xtype: 'textfield', name: 'email', fieldLabel: 'Email', vtype: 'email' },
        { xtype: 'numberfield', name: 'edad', fieldLabel: 'Edad', minValue: 0, maxValue: 120 },
        { xtype: 'numberfield', name: 'telefono', fieldLabel: 'Teléfono' }
    ],

    buttons: [
        {
            text: 'Guardar',
            action: 'guardarUsuario',
            formBind: true
        },
        {
            text: 'Cancelar',
            action: 'cancelarUsuario'
        }
    ]
});
