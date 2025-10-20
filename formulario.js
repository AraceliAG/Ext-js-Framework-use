Ext.onReady(function () {
    // Creamos el botón que abrirá el formulario
    Ext.create('Ext.Button', {
        renderTo: Ext.getBody(),
        text: 'Abrir Formulario',
        margin: 20,
        handler: function () {
            // Al hacer clic en el botón, se crea y muestra una ventana con el formulario
            var formWindow = Ext.create('Ext.window.Window', {
                title: 'Formulario de Usuario',
                width: 700,
                height: 500,
                modal: true,
                layout: 'fit',
                items: [
                    {
                        xtype: 'form',
                        layout: 'vbox',
                        bodyPadding: 10,
                        defaults: {
                            width: '100%',
                            margin: '0 0 10 0'
                        },
                        items: [
                            // Sección 1: Datos del usuario
                            {
                                xtype: 'fieldset',
                                title: 'Folio',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [
                                   
                                    {
                                    xtype: 'combobox',
                                    fieldLabel: 'Tipo',
                                    name: 'tipo',
                                    store: ['Opción 1', 'Opción 2', 'Opción 3'], // <-- Aquí pones tus opciones
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false, // Opcional: para que solo se pueda seleccionar de la lista
                                    allowBlank: false // Opcional: hace que sea obligatorio
                                },
                                 {
                                     xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 0 10 0',
                                    items: [
                                        
                                        {
                                        xtype: 'textfield',
                                        fieldLabel: 'Folio',
                                        name: 'folio',
                                        flex: 1,
                                        allowBlank: false
                                        },

                                        {
                                        xtype: 'button',
                                        text: 'Agregar',
                                        name: 'agregar',
                                        handler: function () {
                                            Ext.Msg.alert('', 'Agregado');
                                        }
                                    }

                                    ]},
,
                                    
                                ]
                            },

                            // Sección 2: Grid de datos (solo lectura)
                            {
                                xtype: 'fieldset',
                                title: 'Datos del Equipo',
                                layout: 'fit',
                                height: 250,
                                items: [
                                    {
                                        xtype: 'grid',
                                        border: true,
                                        store: {
                                            autoLoad: true,
                                            proxy: {
                                                type: 'ajax',
                                                url: '/api/equipos', // Reemplaza con tu URL real del backend
                                                reader: {
                                                    type: 'json',
                                                    rootProperty: 'data'
                                                }
                                            },
                                            fields: ['id', 'ubicacion', 'tecnico', 'orden', 'equipo']
                                        },
                                        columns: [
                                            { text: 'ID', dataIndex: 'id', flex: 1 },
                                            { text: 'Ubicación', dataIndex: 'ubicacion', flex: 1 },
                                            { text: 'Técnico', dataIndex: 'tecnico', flex: 1 },
                                            { text: 'Orden', dataIndex: 'orden', flex: 1 },
                                            { text: 'Equipo', dataIndex: 'equipo', flex: 1 }
                                        ]
                                    }
                                ]
                            },

                            //UBICACIÓN

                            {
                                xtype: 'fieldset',
                                title: 'Ubicación',
                                layout: 'anchor',
                                height: 250,
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Ubicación',
                                        name: 'ubicacion',
                                        store:['GUADALAJAR', 'TLAXCALA', 'CDMX'],
                                        queryMode:'local',
                                        forceSelection: true,
                                        editable: false, // Opcional: para que solo se pueda seleccionar de la lista
                                        allowBlank: false // Opcional: hace que sea obligatorio
                                    }
                                ]
                            }
                        ],
                        buttons: [
                            {
                                text: 'ACTUALIZAR',
                                formBind: true,
                                handler: function () {
                                    const form = this.up('form').getForm();
                                    if (form.isValid()) {
                                        Ext.Msg.alert('Datos del formulario', JSON.stringify(form.getValues(), null, 2));
                                    }
                                }
                            },
                            {
                                text: 'Cancelar',
                                handler: function () {
                                    this.up('window').close();
                                }
                            }
                        ]
                    }
                ]
            });

            formWindow.show();
        }
    });
});
