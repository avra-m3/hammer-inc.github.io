<script>
function resume() {
    function toggleVisible(element) {
        console.log("Toggle Visibility\n" + element.id)
        if (element.getAttribute("data-hidden")) {
            element.classList.remove("print-hidden");
            element.removeAttribute("data-hidden");
            localStorage.removeItem(element.id + "_hidden");
        } else {
            element.setAttribute("data-hidden", true);
            element.classList.add("print-hidden");
            localStorage.setItem(element.id + "_hidden", "true");
            showResetState();
        }
        updateCollectionVisibility(element.getAttribute("data-collection"))
    }

    function beginDrag(ev) {
        ev.dataTransfer.setData("elem_id", ev.target.id);
    }

    function allowDrop(ev, elem) {
        var target = document.getElementById(ev.dataTransfer.getData("elem_id"));
        if (target.getAttribute("data-collection") === elem.getAttribute("data-collection")) {
            ev.preventDefault();
        }
    }

    function droppedOn(ev, elem) {
        var target = document.getElementById(ev.dataTransfer.getData("elem_id"));
        var oldOrder = parseInt(target.style.order);
        var newOrder = parseInt(elem.style.order);
        if (target.getAttribute("data-collection") === elem.getAttribute("data-collection")) {
            console.log("[EVENT] Dropped On Node");
            updateIndex(target, newOrder);
            updateIndex(elem, oldOrder);
        }
    }

    function droppedOnCollection(ev, elem) {
        var target = document.getElementById(ev.dataTransfer.getData("elem_id"));
        if (target.getAttribute("data-collection") !== elem.getAttribute("data-title")) {
            console.log("[EVENT] Dropped On Collection");
            updateCollection(target, elem);
        }

    }

    function allowDropCollection(ev, elem) {
        var target = document.getElementById(ev.dataTransfer.getData("elem_id"));
        if (target.getAttribute("data-collection") !== elem.getAttribute("data-title")) {
            ev.preventDefault();
        }
    }

    function updateCollectionVisibility(collectionName) {
        var collection = document.getElementById(collectionName);
        if (collection.querySelectorAll(".item.print-hidden").length === collection.querySelectorAll(".item").length) {
            collection.classList.add("print-hidden");
            console.log("Hide " + collection.id);

        }else{
            if(collection.classList.contains("print-hidden")){
                collection.classList.remove("print-hidden")
            }
        }
    }

    function updateIndex(elem, index) {
        elem.style.order = index;
        localStorage.setItem(elem.id + "_index", index);
        console.log("Update Order\n<" + elem.id + ">: " + index);
        showResetState();
    }

    function updateCollection(elem, collection) {
        var title = collection.getAttribute("data-title");
        var oldCollection = elem.getAttribute("data-collection");
        console.log("Update Collection\n<" + elem.id + ">:" + collection.id);
        localStorage.setItem(elem.id + "_collection", title);
        elem.setAttribute("data-collection", title);
        collection.appendChild(elem);

        updateIndex(elem, parseInt(collection.lastElementChild.style.order) + 1);
        updateCollectionVisibility(title);
        updateCollectionVisibility(oldCollection);
    }

    function showResetState() {
        document.getElementById("reset").style.display = "block"
    }

    function restoreState() {
        console.log("Restoring State");
        var collections = document.getElementsByClassName("collection");
        for (var index = 0; index < collections.length; index++) {
            var collection = collections[index];
            var items = collection.children;
            for (var i2 = 0; i2 < items.length; i2++) {
                var item = items[i2];
                var hidden = localStorage.getItem(item.id + "_hidden");
                var newIndex = localStorage.getItem(item.id + "_index");
                var newCol = localStorage.getItem(item.id + "_collection");
                if (hidden) {
                    toggleVisible(item);
                }
                if (newCol) {
                    updateCollection(item, document.getElementById(newCol));
                }
                if (newIndex) {
                    updateIndex(item, newCol);
                }

                if( hidden || newCol || newIndex){
                    showResetState()
                }
            }
        }
    }
    function resetState() {
        console.log("Reset State");
        var collections = document.getElementsByClassName("collection");
        for (var index = 0; index < collections.length; index++) {
            var collection = collections[index];
            var items = collection.children;
            for (var i2 = 0; i2 < items.length; i2++) {
                var item = items[i2];
                localStorage.removeItem(item.id + "_hidden");
                localStorage.removeItem(item.id + "_index");
                localStorage.removeItem(item.id + "_collection");
            }
        }
        window.location.reload()
    }

    function init() {
        window.addEventListener("DOMContentLoaded", restoreState)
    }

    return {
        toggleVisibility: toggleVisible,
        drag: {
            begin: beginDrag,
            test: allowDrop,
            drop: droppedOn
        },
        dragCollection: {
            drop: droppedOnCollection,
            test: allowDropCollection
        },
        init: init,
        reset: resetState,
    }
}

resume().init();
</script>