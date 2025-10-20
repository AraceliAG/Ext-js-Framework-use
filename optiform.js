Ext.onReady(function () {
    // Función para crear un fieldset reutilizable con un combobox técnico
    function createTecnicoFieldset(title, comboLabel, fields) {
        return {
            xtype: 'fieldset',
            title: title,
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                margin: '0 0 10 0'
            },
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: comboLabel,
                    name: 'tecnico_' + title.toLowerCase().replace(/\s/g, ''),
                    store: ['Opción 1', 'Opción 2', 'Opción 3'],
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    allowBlank: false
                },
                ...fields
            ]
        };
    }

    function crearCampoFecha(config) {
    return Ext.apply({
        xtype: 'datefield',
        fieldLabel: 'Fecha',
        format: 'd/m/Y',
        submitFormat: 'Y-m-d',
        minValue: new Date(),
        allowBlank: false
    }, config);
}

    // Creamos la ventana al hacer clic en el botón
    Ext.create('Ext.Button', {
        renderTo: Ext.getBody(),
        text: 'Abrir Formulario',
        margin: 20,
        handler: function () {
            Ext.create('Ext.window.Window', {
                title: 'Formulario de Usuario',
                width: 600,
                height: 700,
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
                                        store: ['Opción 1', 'Opción 2', 'Opción 3'],
                                        queryMode: 'local',
                                        forceSelection: true,
                                        editable: false,
                                        allowBlank: false
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
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
                                                handler: function () {
                                                    Ext.Msg.alert('', 'Agregado');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },

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
                                                url: '/api/equipos',
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

                            // Sección SALIDA/RETORNO
                            createTecnicoFieldset('SALIDA/RETORNO', 'Técnico', [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Dirección',
                                            name: 'direccion',
                                            flex: 1,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Ciudad',
                                            name: 'ciudad',
                                            flex: 1,
                                            allowBlank: false
                                        }
                                    ]
                                },
                                crearCampoFecha(
                                    {
                                    fieldLabel: 'Fecha de envío',
                                    name: 'fechaEnvio'
                                    }),
                            ]),

                            // Sección PAQUETERÍA
                            createTecnicoFieldset('PAQUETERÍA', 'Técnico', [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Guía',
                                            name: 'guia',
                                            flex: 1,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Tracking',
                                            name: 'tracking',
                                            flex: 1,
                                            allowBlank: false
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Dir. Salida',
                                            name: 'dirSalida',
                                            flex: 1,
                                            allowBlank: false
                                        },
                                       crearCampoFecha({
                                        fieldLabel: 'Fecha de envío',
                                        name: 'fechaEnvio'
                                        })

                                    ]
                                }
                            ]),

                            // Sección CONFIRMACIÓN
                            {
                                xtype: 'fieldset',
                                title: 'CONFIRMACIÓN DE PAQUETERÍA',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    margin: '0 0 10 0'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Dir destino',
                                                name: 'dirDestino',
                                                flex: 1,
                                                allowBlank: false
                                            },
                                            crearCampoFecha({
                                            fieldLabel: 'Fecha de envío',
                                            name: 'fechaRep'
                                                })

                                        ]
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Nombre de quién recibe',
                                        name: 'nombreReceptor',
                                        allowBlank: false
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
            }).show();
        }
    });
});
