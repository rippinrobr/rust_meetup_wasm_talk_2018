extern crate cfg_if;
extern crate wasm_bindgen;
extern crate web_sys;
extern crate js_sys;

mod utils;
pub mod config;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use config::Pattern;

const CANVAS_ID: &str = "test-pattern";
const CANVAS_WRAPPER: &str = "canvas-wrapper";
const DELETE_BTN_ID: &str = "delete-image";

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(msg: &str);
}

// init - handles setting up the draw button's event handler
#[wasm_bindgen]
pub fn init() {
    // after this call, any panic messages will be written to the console
    utils::set_panic_hook();
    
    // Getting the delete image button so I can hide it.
    let document = get_document().expect("should have a document on window");
    let delete_btn = document.get_element_by_id(DELETE_BTN_ID).unwrap();
    delete_btn.set_attribute("style", "display:none;").unwrap();

    // this section is the first step in hooking up the delete button's 
    // event handler
    let doc = document.clone();
    let btn = delete_btn.clone();

    // creates the closure for the handler, which is what will execute when the
    // handler is executed.  Gets the image element and removes it from the 
    // Dom and then hides the button again.
    let delete_cb_closure = Closure::wrap(Box::new(move |_: web_sys::MouseEvent| {
        if let Some(elem)  = doc.get_element_by_id(CANVAS_ID) {
            elem.remove();
            btn.set_attribute("style", "display:none;").unwrap();
        };
    // fnMut allows the closure to be called many times and may mutate state
    }) as Box<FnMut(_)>);

    // wires up the handler so that when a click event occurrs it calls our closure
    (delete_btn.as_ref() as &web_sys::EventTarget)
        .add_event_listener_with_callback("click", delete_cb_closure.as_ref().unchecked_ref())
        .unwrap();
    delete_cb_closure.forget();
}

// draw does what you might think it does, it creates the canvas and then
// draws the pattern on the it.
#[wasm_bindgen]
pub fn draw(pattern: &Pattern) {
    let document = get_document().expect("should have a document on window");
    let img_wrapper = document.get_element_by_id(CANVAS_WRAPPER).unwrap();
    let delete_btn = document.get_element_by_id(DELETE_BTN_ID).unwrap();

    // if there already is a canvas delete it so we don't stack canvas up 
    // and have more than one
    if let Some(elem)  = document.get_element_by_id(CANVAS_ID) {
        elem.remove();
    };

    // creates the element that is the canvas and gives it
    // the test-pattern ID
    let canvas_elem = document
        .create_element("canvas")
        .unwrap();
    canvas_elem.set_attribute("id", CANVAS_ID).unwrap();

    // converts the web_sys::Element into the actual canvas element,
    // web_sys::HtmlCanvasElement so I can draw on it
    let canvas = canvas_elem
        .dyn_into::<web_sys::HtmlCanvasElement>()  // casts the Element into HtmlCanvasElement (checked at runtime)
        .map_err(|_| ())
        .unwrap();

    (img_wrapper.as_ref() as &web_sys::Node)
        .append_child(canvas.as_ref() as &web_sys::Node)
        .unwrap();

    canvas.set_width(pattern.width());
    canvas.set_height(pattern.height());

    (canvas.as_ref() as &web_sys::HtmlElement)
        .style()
        .set_property("border", "solid")
        .unwrap();
    (canvas.as_ref() as &web_sys::HtmlElement)
        .style()
        .set_property("color", &pattern.get_line_color().as_string().unwrap())
        .unwrap();

    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    let width =  &pattern.width();
    let height = &pattern.height();
    let half_height = *height as f64/2.0;

    // background color & text attributes
    context.set_fill_style(&pattern.get_bgcolor());
    context.fill_rect(0.0, 0.0, pattern.width() as f64, pattern.height() as f64);
    context.set_text_align("left");
    context.set_font("normal normal bold 22px Arial");

    // setup the line color and draw the middle line
    context.set_stroke_style( &pattern.get_line_color() );
    context.move_to(0.0, half_height);
    context.line_to(*width as f64, half_height); 
    context.stroke();   

    log(&format!("canvas width: {:#?}", width));
    log(&format!("canvas height: {:#?}", height));

    let letters = vec!["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let mod_w = pattern.get_mod_width();
    let mod_h = pattern.get_mod_height();
    let mods_per = pattern.get_num_mods_per_cabinet();
    let half_mods = mods_per/2;
    let cab_width = pattern.get_cabinet_width();
    for cidx in 0..pattern.get_num_cabinets() {
        log(&format!("cidx: {:#?}", cidx));
        for midx in 0..mods_per {
            let x: f64 = (((midx % half_mods) * mod_w) + (cidx * cab_width)) as f64;
            let y: f64 = if midx < half_mods { 0.0 } else { mod_h as f64 };

            context.set_stroke_style( &pattern.get_line_color() );
            context.move_to(x, y);
            context.line_to(x, y + mod_h as f64); 
            context.stroke();  

            let label = &format!("{}{}", letters[(cidx % 27) as usize], midx+1);
            let text_x = x + (mod_w as f64/2.7);
            let text_y = y + (mod_h as f64/1.6);
            context.set_stroke_style( &pattern.get_label_color() );
            match context.stroke_text_with_max_width(label, text_x , text_y, mod_w as f64) {
                Err(e) => log(&format!("label error: {:#?}", e)),
                _ => ()
            }

            log(&format!("    midx: {:#?}  ({}, {})  {}", midx, x, y, label));
        }
        
    }
    delete_btn.set_attribute("style", "display:'';").unwrap();
}

pub fn get_document() -> Option<web_sys::Document> {
    let window = web_sys::window().expect("no global `window` exists");
    window.document()
}


