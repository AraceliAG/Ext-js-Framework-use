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

                            //SECCION 3: SALIDA/RETORNO
                            {
                                xtype: 'fieldset',
                                title: 'SALIDA/RETORNO',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    margin: '0 0 10 0'
                                },
                                items: [
                                    {
                                        //TECNICO
                                        xtype: 'combobox',
                                        fieldLabel: 'Técnico',
                                        name: 'tecnico',
                                        store: ['Opción 1', 'Opción 2', 'Opción 3'], // Reemplaza con tus opciones reales
                                        queryMode: 'local',
                                        forceSelection: true,
                                        editable: false,
                                        allowBlank: false
                                    },

                                    //DIRECCION
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items:[
                                            {

                                                xtype: 'textfield',
                                                fieldLabel: 'Dirección',
                                                name: 'direccion',
                                                allowBlank: false
                                            },
                                            //CIUDAD
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Ciudad',
                                                name: 'ciudad',
                                                allowBlank: false
                                            }
                                        ]
                                    },
                                        //FECHA DE ENVIO
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Fecha de envío',
                                            name: 'fechaEnvio',
                                            format: 'd/m/Y',
                                            submitFormat: 'Y-m-d',
                                            minValue: new Date(), // no permite seleccionar fechas anteriores a hoy
                                            allowBlank: false
                                        }
                                    

                                ]
                            },


                             //SECCION 4: PAQUETERÍA
                            {
                                xtype: 'fieldset',
                                title: 'PAQUETERÍA',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    margin: '0 0 10 0'
                                },
                                items: [
                                    {
                                        //TECNICO
                                        xtype: 'combobox',
                                        fieldLabel: 'Técnico',
                                        name: 'tecnico',
                                        store: ['Opción 1', 'Opción 2', 'Opción 3'], // Reemplaza con tus opciones reales
                                        queryMode: 'local',
                                        forceSelection: true,
                                        editable: false,
                                        allowBlank: false
                                    },

                                    //DIRECCION
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items:[
                                            {

                                                xtype: 'textfield',
                                                fieldLabel: 'Guia',
                                                name: 'guia',
                                                allowBlank: false
                                            },
                                            //CIUDAD
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Tracking',
                                                name: 'tracking',
                                                allowBlank: false
                                            }
                                        ]
                                    },
                                        //FECHA DE ENVIO
                                        {
                                             xtype: 'container',
                                            layout: 'hbox',
                                            items:[

                                                {                                                   
                                                xtype: 'textfield',
                                                fieldLabel: 'Dir. Salida',
                                                name: 'dirSalida',
                                                allowBlank: false                                          
                                                },

                                                {
                                                xtype: 'datefield',
                                                fieldLabel: 'Fecha de envío',
                                                name: 'fechaEnvio',
                                                format: 'd/m/Y',
                                                submitFormat: 'Y-m-d',
                                                minValue: new Date(), // no permite seleccionar fechas anteriores a hoy
                                                allowBlank: false

                                                }
                                        ]
                                        }
                                    

                                ]
                            },

                            //SECCION 5: CONFIRMACIÓN DE PAQUETERIA

                            {
                                xtype: 'fieldset',
                                title: 'CONFIRMACIÓN DE PAQUETERÍA',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    margin: '0 0 10 0'
                                },
                                items: [
                                   //
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items:[
                                            {

                                                xtype: 'textfield',
                                                fieldLabel: 'Dir destino',
                                                name: 'dirDestino',
                                                allowBlank: false
                                            },
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: 'Fecha de Recepción',
                                                name: 'fechaRep',
                                                format: 'd/m/Y',
                                                submitFormat: 'Y-m-d',
                                                minValue: new Date(), // no permite seleccionar fechas anteriores a hoy
                                                allowBlank: false

                                                }
                                        ]
                                    },
                                        
                                     {                                                   
                                        xtype: 'textfield',
                                        fieldLabel: 'Nombre de quién recibe',
                                        name: 'nombreReceptor',
                                        allowBlank: false                                          
                                        },

                                          
                                    

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
