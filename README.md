FileDrop
---

#### Simple Drag & Drop file management


This small javascript library allow you to drop some files in any area of your HTML page
(this area can be the body !) and to manage these files using the HTML5 drag & drop API.

**A javascript alert()** will be displayed if [this Drag & Drop API is not available for the browser.](http://caniuse.com/#feat=dragndrop)


The installation is minimal, just include the library and create a new FileDropper instance:
----------------------------

```html
<script src='your/js/folder/file-dropper-1.0.0.min.js'></script>
<script>
  var FD = new FileDropper(document.getElementById('#drop-area'), function (files, dropEvent, dropper) {
        /*
        This is your callback, you can catch 3 arguments: a files array, the original dropEvent and the current FileDropper instance
        // Do what you want here, by example, upload your files asynchrounously
        */
        console.log(files);
  });
</script>
```

Place it at the bottom of your body to be sure that your DOM is loaded,
and that your element #drop-area exists, or place it on a onLoad callback.

#### This repository contains a demo project, with a "file upload" as callback, using HTML5 File API.
