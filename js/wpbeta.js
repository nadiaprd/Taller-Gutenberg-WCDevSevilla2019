( function( blocks, components, i18n, element ) {

  var el = element.createElement;
  var MediaUpload = wp.editor.MediaUpload;
  var InnerBlocks = wp.editor.InnerBlocks;
  var IconButton = components.IconButton;
 
 var pagestTotal =0;
 var autorLibro='';

  blocks.registerBlockType(
    'wpbeta/book', {
    title: i18n.__( 'Comments books' ),
    icon: 'book',
    category: 'common',
    attributes: {
      title: {type: 'string'},
      total: {type: 'int'},
      date: {type: 'string'},
      text: {type: 'string'},
      mediaID: {
        type: 'number',
      },
      mediaURL: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'src',
      }
    },

    edit: function( props ) {

      var focus = props.focus;
      var focusedEditable = props.focus ? props.focus.editable || 'name' : null;
      var alignment = props.attributes.alignment;
      var attributes = props.attributes;
      var contactURL = props.attributes.contactURL;

      function updateTitle(event) {
        props.setAttributes({title: event.target.value})
        autorLibro = event.target.value;
      }

      function updateURL(event) {
        props.setAttributes({url: event.target.value})
      }
      function updateTotal(event) {
        props.setAttributes({total: event.target.value})
        pagestTotal = event.target.value;
      }

      function updateRead(event) {
        props.setAttributes({read: event.target.value})
      }
      function updateText(event) {
        props.setAttributes({text: event.target.value})
      }

      function updateTimeline(event) {
        props.setAttributes({timeline: event.target.value})
      }


      var onSelectImage = function( media ) {
        return props.setAttributes( {
          mediaURL: media.url,
          mediaID: media.id,
        } );
      };
      return [
       
        el( 'div', { className: props.className },
          el( 'div', {
            className: attributes.mediaID ? ' imgactive box-img' : ' img-disabled box-img',
            style: attributes.mediaID ? { backgroundImage: 'url(' + attributes.mediaURL + ')' } : {}
          },
            el( MediaUpload, {
              onSelect: onSelectImage,
              type: 'image',
              value: attributes.mediaID,
              render: function( obj ) {
                return el( IconButton, {
                  className: attributes.mediaID ? 'image-button' : 'button button-large',
                  onClick: obj.open
                  },
                  ! attributes.mediaID ? i18n.__( 'Adjuntar una imagen' ) : el( 'img', { src: attributes.mediaURL } )
                );
              }
            } )
          ),
          el( 'div', {
            className: 'form', style: { textAlign: alignment } },
              el(
                "div",
                { class: "form-box col2"},
                    el("label", {},'Título y autor del libro'),
                    el("input", { type: "text", value: props.attributes.title, onChange: updateTitle }),
              ),
            
              el(
                "div",
                { class: "form-box col2"},
                    el("label", {},'Número total de páginas'),
                    el("input", { type: "number", value: props.attributes.total, onChange: updateTotal }),
              ),

              
              el(
                "div",
                { class: "form-box col1"},
                    el("label", {},'Añade una sipnosis'),
                    el("textarea", { rows: "4", value: props.attributes.text, onChange: updateText }),
              )
          ),

          el(InnerBlocks, {
            className:'prueba',
             allowedBlocks: [
                'common/timeline',
              ],
           render: function( obj ) {

              console.log(obj);
          
          }}),
        )
      ];
    },

    save: function( props ) {


      var attributes = props.attributes;

      return (
        el( 'div', { className: props.className },
          el( "div",
            { class: "bloqueTimeline", 
              data_total: props.attributes.total, 
              data_read: props.attributes.read },

              el( "div",
                { class: "content"},
                el("div",
                  { class: "infoR"},
                  el( 'img', { src: attributes.mediaURL } ),
                  
                  el("div",{ class: "text"},
                    el( "h3",{ class: "title"}, props.attributes.title), 
                    el('div', {numberOfLines: 10, class: "desc"},  props.attributes.text),
                    el( InnerBlocks.Content, null ),

                  ),
                ),
                
              ), 
            )
        )
      );
    },
  } ),

  blocks.registerBlockType(
    'common/timeline', {
    title: i18n.__( 'Coments timeline' ),
    icon: 'chart-area',
    category: 'common',
    disabled:true,
    attributes: {

      read: {type: 'int'},
      date: {type: 'string'},
      timeline: {type: 'string'}
    },

    edit: function( props ) {

      var focus = props.focus;
      var focusedEditable = props.focus ? props.focus.editable || 'name' : null;
      var alignment = props.attributes.alignment;
      var attributes = props.attributes;
      var contactURL = props.attributes.contactURL;

      function updateRead(event) {
        props.setAttributes({read: event.target.value})
      }

      function updateTimeline(event) {

        props.setAttributes({timeline :event.target.value})
      }

      function updateDate(event) {
        props.setAttributes({date: event.target.value})
      }

      return [
       
        el( 'div', { className: props.className },
          
          el( 'div', {
            className: 'form', style: { textAlign: alignment } },
            
              el(
                "div",
                { class: "form-box col2"},
                    el("label", {},'Número de páginas leídas'),
                    el("input", { type: "number", value: props.attributes.read, onChange: updateRead }),
                
              ),
              el(
                "div",
                { class: "form-box col1"},
                    el("label", {},'Añade un comentario'),
                    el("textarea", { rows: "4", value: props.attributes.timeline, onChange: updateTimeline }),
              )
          )
        )
      ];
    },

    save: function( props ) {

       const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

      var date = new Date().getDate(); //Current Date
      var month = monthNames[new Date().getMonth()]; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      var time = hours + ": " + min +" : "+ sec;
      var attributes = props.attributes;

      var porcent = (props.attributes.read/pagestTotal)*100;
     var result = Math.round(porcent);



      return el("div",
                  { class: "timeline"}, 

                  el('div', { class: "dateBox"}, 

                   el('div', { class: "date prd_getDate"}, 
                      el('div', { class: "dia"}, date),
                      el('div', { class: "mes"}, month),
                      el('div', { class: "anio"}, year),

                    ),

                    el("div",
                        { class: "infoV"},
                          el("div", { class: "icono"},
                            el('div', { class: "num", id:'prd_getNum'},  null)
                          ),
                      ),
                  ),
                    


                  el("div",{ class: "text"},
                    
                    el('div', {
                      data_total:props.attributes.read,
                      class: "desc",
                      id:'prd_getPages',
                      data_total: props.attributes.total, 
                      data_read: props.attributes.read ,},  
                        props.attributes.timeline,   
                    ),
                      el('div', {
                        data_total:props.attributes.read,
                        class: "info"},  
                          result+"% leído"),
                      el('div', {class: "info-autor"},autorLibro),

                    

                  ),
                  

                  
                )
    },
  } );

} )(
  window.wp.blocks,
  window.wp.components,
  window.wp.i18n,
  window.wp.element,
);
