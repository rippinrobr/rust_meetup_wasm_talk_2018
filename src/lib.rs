extern crate cfg_if;
extern crate wasm_bindgen;
extern crate web_sys;
extern crate js_sys;

mod utils;
pub mod config;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use config::Pattern;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(msg: &str);
}

#[wasm_bindgen]
pub fn init() {
    utils::set_panic_hook();
    
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let delete_btn = document.get_element_by_id("delete-image").unwrap();
    delete_btn.set_attribute("style", "display:none;").unwrap();

    let doc = document.clone();
    let btn = delete_btn.clone();
    let delete_cb_closure = Closure::wrap(Box::new(move |_: web_sys::MouseEvent| {
        if let Some(elem)  = doc.get_element_by_id("test-pattern") {
            elem.remove();
            btn.set_attribute("style", "display:none;").unwrap();
        };
    }) as Box<FnMut(_)>);

    (delete_btn.as_ref() as &web_sys::EventTarget)
        .add_event_listener_with_callback("click", delete_cb_closure.as_ref().unchecked_ref())
        .unwrap();
    delete_cb_closure.forget();
}

#[wasm_bindgen]
pub fn draw(pattern: &Pattern) {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let delete_btn = document.get_element_by_id("delete-image").unwrap();

    // delete the previous image if the test-pattern canvas is there
    if let Some(elem)  = document.get_element_by_id("test-pattern") {
        elem.remove();
    };

    let canvasElem = document
        .create_element("canvas")
        .unwrap();
    canvasElem.set_attribute("id", "test-pattern").unwrap();

    let canvas = canvasElem
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .map_err(|_| ())
        .unwrap();

    (document.body().unwrap().as_ref() as &web_sys::Node)
        .append_child(canvas.as_ref() as &web_sys::Node)
        .unwrap();

    canvas.set_width(pattern.width());
    canvas.set_height(pattern.height());

    (canvas.as_ref() as &web_sys::HtmlElement)
        .style()
        .set_property("border", "solid")
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
    context.set_font("18px san serif");

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
            context.move_to(x, y);
            context.line_to(x, y + mod_h as f64); 
            context.stroke();  

            let label = &format!("{}{}", letters[(cidx % 27) as usize], midx+1);
            let text_x = x + (mod_w as f64/2.7);
            let text_y = y + (mod_h as f64/1.6);
            match context.stroke_text_with_max_width(label, text_x , text_y, mod_w as f64) {
                Err(e) => log(&format!("label error: {:#?}", e)),
                _ => ()
            }

            log(&format!("    midx: {:#?}  ({}, {})  {}", midx, x, y, label));
        }
        
    }
    delete_btn.set_attribute("style", "display:'';").unwrap();
}


