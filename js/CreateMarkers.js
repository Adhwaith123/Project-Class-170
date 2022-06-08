AFRAME.registerComponent("create-markers",{
init:async function(){
    var mainScene=document.querySelector("#main-scene")
    var dishes= await this.getdishes()
    dishes.map((dish)=>{
        var marker=document.createElement("a-marker")
        marker.setAttribute("id",dish.id)
        marker.setAttribute("type","pattern")
        marker.setAttribute("url",dish.marker_pattern_url)
        marker.setAttribute("cursor",{rayorigin})
        marker.setAttribute("markerHandler",{})
        mainScene.appenchild("marker")

        var model=document.createElement("a-entity")
        model.setAttribute("id",`model-${dish.id}`)
        model.setAttribute("position",dish.model_geometry.position)
        model.setAttribute("rotation",dish.model_geometry.rotation)
        model.setAttribute("scale",dish.model_geometry.scale)
        model.setAttribute("gltf-model",`url(${dish.model_url})`)
        model.setAttribute("gesture-handler",{})
        marker.appenchild("model")

        var mainplane=document.createElement("a-plane")
        mainplane.setAttribute("id",`mainplane-${dish.id}`)
        mainplane.setAttribute("position",{x:0, y:0, z:0})
        mainplane.setAttribute("rotation",{x:-90,y:0,z:0})
        mainplane.setAttribute("width",1.7)
        mainplane.setAttribute("heigt",1.5)
        marker.appenchild(mainplane)

        var titleplane=document.createElement("a-plane")
        titleplane.setAttribute("id",`mainplane-${dish.id}`)
        titleplane.setAttribute("position",{x:0, y:0, z:0})
        titleplane.setAttribute("rotation",{x:-90,y:0,z:0})
        titleplane.setAttribute("width",1.7)
        titleplane.setAttribute("heigt",1.5)
        marker.appenchild(titleplane)


    })
},
getdishes:async function(){
    return await firebase
    .firestore()
    .collection("Dishes")
    .get()
    .then((snap)=>{
        return snap.docs.map((doc)=>{
            doc.data()

        })
        
    })

}
})