extern crate wasm_bindgen;
extern crate web_sys;
extern crate js_sys;
use wasm_bindgen::prelude::*;
//use wasm_bindgen::JsCast;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn popup() {
    alert("Hello, rust-meetup-wasm-talk!");
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
    pub fn get_bgcolor(&self) -> &JsValue {
        &self.bgcolor
    }
    
    pub fn get_cabinet_width(&self) -> u32 {
        self.mod_width * (self.mods_per_cabinet / 2)
    }

    pub fn get_label_color(&self) -> &JsValue {
        &self.label_color
    }

    pub fn get_line_color(&self) -> &JsValue {
        &self.line_color
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

    fn get_cabinet_height(&self) -> u32 {
        self.mod_height * (self.mods_per_cabinet / 2)
    }
}
