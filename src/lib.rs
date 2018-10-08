extern crate cfg_if;
extern crate wasm_bindgen;
extern crate web_sys;
extern crate js_sys;

mod utils;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(msg: &str);
}

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct Pattern {
    bgcolor: JsValue,
    line_color: JsValue,
    label_color: JsValue,
    mod_height: u32,
    mod_width: u32,
    mods_per_cabinet: u32,
    num_cabinets: u32,
}

#[wasm_bindgen]
impl Pattern {
    pub fn new(bgcolor: JsValue, line_color: JsValue, label_color: JsValue, mod_h: u32, mod_w: u32, mod_per_cabs: u32, num_cabs: u32) -> Pattern {
        Pattern {
            bgcolor: bgcolor,
            line_color: line_color,
            label_color: label_color,
            mod_height: mod_h,
            mod_width: mod_w,
            mods_per_cabinet: mod_per_cabs,
            num_cabinets: num_cabs,
        }
    }
}

impl Pattern {
    fn get_cabinet_height(&self) -> u32 {
        self.mod_height * (self.mods_per_cabinet / 2)
    }

    pub fn get_cabinet_width(&self) -> u32 {
        self.mod_width * (self.mods_per_cabinet / 2)
    }

    pub fn get_mod_height(&self) -> u32 {
        self.mod_height
    }

    pub fn get_mod_width(&self) -> u32 {
        self.mod_width
    }

    pub fn get_num_cabinets(&self) -> u32 {
        self.num_cabinets
    }

    pub fn width(&self) -> u32 {
        self.get_cabinet_width() * self.num_cabinets
    }

    pub fn height(&self) -> u32 {
        self.get_cabinet_height()
    }

    pub fn get_num_mods_per_cabinet(&self) -> u32 {
        self.mods_per_cabinet
    }
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, rust-meetup-wasm-talk!");
}

#[wasm_bindgen]
pub fn draw(pattern: &Pattern) {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let canvas = document
        .create_element("canvas")
        .unwrap()
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
    context.set_fill_style(&pattern.bgcolor);
    context.fill_rect(0.0, 0.0, pattern.width() as f64, pattern.height() as f64);
    context.set_text_align("left");
    context.set_font("18px san serif");

    // setup the line color and draw the middle line
    context.set_stroke_style( &pattern.line_color );
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
            let text_x = x + (mod_w as f64/5.0);
            let text_y = y + (mod_h as f64/1.6);
            log(&format!("text_x: {}", text_x));
            match context.stroke_text_with_max_width(label, text_x , text_y, mod_w as f64) {
                Err(e) => log(&format!("label error: {:#?}", e)),
                _ => ()
            }

            log(&format!("    midx: {:#?}  ({}, {})  {}", midx, x, y, label));
        }
        
    }
}

#[wasm_bindgen]
pub fn add_html(msg: &str) -> Result<(), JsValue> {
    // Use `web_sys`'s global `window` function to get a handle on the global
    // window object.
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");

    // Manufacture the element we're gonna append
    let val = document.create_element("p")?;
    val.set_inner_html(msg);

    // Right now the class inheritance hierarchy of the DOM isn't super
    // ergonomic, so we manually cast `val: Element` to `&Node` to call the
    // `append_child` method.
    AsRef::<web_sys::Node>::as_ref(&body).append_child(val.as_ref())?;

    Ok(())
}

