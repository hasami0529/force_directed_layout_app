import { dia } from 'jointjs'

export function fake3Tag(id) {
    var l = []
    for (var i=1; i < 4; i++) {
        l.push({ content: `${id}'s fake tag ${i}`} )
    }
    return l
}

// utils to get model info
function getLabel(model) {
    if (model instanceof dia.Element){
      return model.attributes.attrs.label.text
      // if use model.attributes.label.text will get the result before editting (VIEW version)
    }
  }
  
export function modelToInfo(model) {
    if (model instanceof dia.Element){
        return {
        id: model.id,
        role: model.role,
        label: getLabel(model)
        }
    }
}

export function getRole(model) {
    return model.role
}

export function setRole(model, role) {
    model.role = role
    // model.attr('body', {
    //     class: role
    // })
}