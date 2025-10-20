Ext.define('MiApp.controller.UsuarioController', {
    extend: 'Ext.app.Controller',

    stores: ['Usuarios'],
    models: ['Usuario'],
    views: ['Main', 'UsuarioForm'],

    init: function () {
        this.control({
            'usuariogrid button[action=agregarUsuario]': {
                click: this.agregarUsuario
            },
            'usuariogrid button[action=editarUsuario]': {
                click: this.editarUsuario
            },
            'usuariogrid button[action=eliminarUsuario]': {
                click: this.eliminarUsuario
            },
            'usuarioform button[action=guardarUsuario]': {
                click: this.guardarUsuario
            },
            'usuarioform button[action=cancelarUsuario]': {
                click: this.cancelarUsuario
            }
        });
    },

    agregarUsuario: function () {
        this.abrirVentanaFormulario('Agregar Usuario');
    },

    editarUsuario: function (button) {
        var grid = button.up('grid');
        var seleccion = grid.getSelectionModel().getSelection();

        if (seleccion.length === 0) {
            Ext.Msg.alert('Atención', 'Selecciona un usuario para editar.');
            return;
        }

        this.abrirVentanaFormulario('Editar Usuario', seleccion[0]);
    },

    eliminarUsuario: function (button) {
        var grid = button.up('grid');
        var seleccion = grid.getSelectionModel().getSelection();

        if (seleccion.length === 0) {
            Ext.Msg.alert('Atención', 'Selecciona un usuario para eliminar.');
            return;
        }

        Ext.Msg.confirm('Confirmar', '¿Estás seguro de eliminar al usuario?', function (btn) {
            if (btn === 'yes') {
                var store = grid.getStore();
                store.remove(seleccion[0]);
                store.sync({
                    success: function () {
                        Ext.Msg.alert('Eliminado', 'Usuario eliminado.');
                    },
                    failure: function () {
                        Ext.Msg.alert('Error', 'No se pudo eliminar.');
                    }
                });
            }
        });
    },

    guardarUsuario: function (button) {
        var form = button.up('form');
        var ventana = form.up('window');
        var valores = form.getValues();
        var store = Ext.getStore('Usuarios');

        if (form.getRecord()) {
            form.getRecord().set(valores);
        } else {
            store.add(Ext.create('MiApp.model.Usuario', valores));
        }

        store.sync({
            success: function () {
                Ext.Msg.alert('Éxito', 'Datos guardados correctamente');
                ventana.close();
            },
            failure: function () {
                Ext.Msg.alert('Error', 'No se pudieron guardar los datos');
            }
        });
    },

    cancelarUsuario: function (button) {
        button.up('window').close();
    },

    abrirVentanaFormulario: function (titulo, record) {
        var formPanel = Ext.create('MiApp.view.UsuarioForm');
        var ventana = Ext.create('Ext.window.Window', {
            title: titulo,
            modal: true,
            width: 400,
            layout: 'fit',
            items: [formPanel]
        });

        if (record) {
            formPanel.loadRecord(record);
        }

        ventana.show();
    }
});
