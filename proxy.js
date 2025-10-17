Ext.onReady(function() {
    var modoEdicion = false;
    var registroEditado = null;


    // 1. Definir el modelo Usuario con proxy para operaciones remotas
    Ext.define('Usuario', {
        extend: 'Ext.data.Model',
        fields: ['id', 'nombre', 'email', 'edad'],

        proxy: {
            type: 'ajax',
            api: {
                read: 'usuarios.json',           // URL o endpoint para leer datos
                create: 'usuarios/create',       // Endpoint para crear
                update: 'usuarios/update',       // Endpoint para actualizar
                destroy: 'usuarios/delete'       // Endpoint para eliminar
            },
            reader: {
                type: 'json',
                root: 'users',   // nombre de la propiedad en el JSON que contiene el array
                successProperty: 'success'
            },
            writer: {
                type: 'json',
                writeAllFields: true,
                root: 'users'
            }
        }
    });

    // 2. Store con proxy
    var storeUsuarios = Ext.create('Ext.data.Store', {
        model: 'Usuario',
        autoLoad: true,   // cargará automáticamente los datos al iniciar
        autoSync: true    // sincroniza automáticamente los cambios (create/update/destroy)
    });

    // 3. Grid como antes
    var grid = Ext.create('Ext.grid.Panel', {
        title: 'Usuarios registrados',
        store: storeUsuarios,
        columns: [
            { text: 'ID', dataIndex: 'id', width: 50 },
            { text: 'Nombre', dataIndex: 'nombre', flex: 1 },
            { text: 'Email', dataIndex: 'email', flex: 1 },
            { text: 'Edad', dataIndex: 'edad', width: 80 }
        ],
        width: 600,
        height: 300,
        renderTo: Ext.getBody(),
        tbar: [
            {
                text: 'Agregar Usuario',
                handler: function() {
                    modoEdicion = false;
                    registroEditado = null;
                    formulario.getForm().reset();
                    ventanaAgregar.setTitle('Agregar nuevo usuario');
                    ventanaAgregar.show();
                }
            },
            {
                text: 'Eliminar Usuario',
                handler: function() {
                    var seleccion = grid.getSelectionModel().getSelection();
                    if (seleccion.length === 0) {
                        Ext.Msg.alert('Atención', 'Selecciona un usuario para eliminar.');
                        return;
                    }
                    Ext.Msg.confirm('Confirmar', '¿Deseas borrar este usuario?', function(btn) {
                        if (btn === 'yes') {
                            storeUsuarios.remove(seleccion[0]);
                        }
                    });
                }
            },
            {
                text: 'Modificar Usuario',
                handler: function() {
                    var seleccion = grid.getSelectionModel().getSelection();
                    if (seleccion.length === 0) {
                        Ext.Msg.alert('Atención', 'Selecciona un usuario para editar.');
                        return;
                    }
                    registroEditado = seleccion[0];
                    formulario.getForm().loadRecord(registroEditado);
                    modoEdicion = true;
                    ventanaAgregar.setTitle('Editar Usuario');
                    ventanaAgregar.show();
                }
            }
        ]
    });

    // 4. Formulario
    var formulario = Ext.create('Ext.form.Panel', {
        bodyPadding: 10,
        defaults: {
            anchor: '100%',
            allowBlank: false
        },
        items: [
            { xtype: 'hiddenfield', name: 'id' },
            { xtype: 'textfield', name: 'nombre', fieldLabel: 'Nombre' },
            { xtype: 'textfield', name: 'email', fieldLabel: 'Email', vtype: 'email' },
            { xtype: 'numberfield', name: 'edad', fieldLabel: 'Edad', minValue: 0, maxValue: 120 }
        ],
        buttons: [
            {
                text: 'Guardar',
                formBind: true,
                handler: function() {
                    var form = formulario.getForm();
                    var valores = form.getValues();

                    if (modoEdicion && registroEditado) {
                        // Actualizar registro
                        registroEditado.set(valores);
                    } else {
                        // Nuevo registro
                        storeUsuarios.add(valores);
                    }

                    ventanaAgregar.hide();
                    form.reset();
                }
            },
            {
                text: 'Cancelar',
                handler: function() {
                    ventanaAgregar.hide();
                    formulario.getForm().reset();
                }
            }
        ]
    });

    // 5. Ventana para agregar / editar
    var ventanaAgregar = Ext.create('Ext.window.Window', {
        title: 'Agregar / Editar Usuario',
        modal: true,
        closeAction: 'hide',
        width: 400,
        layout: 'fit',
        items: [formulario]
    });
});