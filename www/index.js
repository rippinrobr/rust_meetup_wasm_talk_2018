import("rust-meetup-wasm-talk").then(testPattern => {
    // sets up the wasm side of things, primarily 
    // hooks up the delete button's event handler
    testPattern.init();
    
    // the call back for the draw button. It creates an instance
    // of the Pattern struct, passing in the values from the form
    // and passes it to the rust draw function.  A struct is instantiated
    // and passed back to rust as an input param
    const drawImage = () => {

        var config = testPattern.Pattern.new(
            document.getElementById("bgcolor").value,
            document.getElementById("line_color").value,
            document.getElementById("label_color").value,
            parseInt(document.getElementById("mod_h").value),
            parseInt(document.getElementById("mod_w").value),
            parseInt(document.getElementById("num_mods_in_cab").value),
            parseInt(document.getElementById("cab_count").value)
      );

      // draw is a rust function that creates a canvas on the dom 
      // that is used to generate the test pattern
      testPattern.draw(config); 
    }

    document.getElementById("draw-image").addEventListener("click", drawImage);
});