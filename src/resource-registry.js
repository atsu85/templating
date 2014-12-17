function register(lookup, name, resource, type){
  if(!name){
    return;
  }

  var existing = lookup[name];
  if(existing){
    if(existing != resource) {
      throw new Error(`Attempted to register an ${type} when one with the same name already exists. Name: ${name}.`);
    }

    return;
  }

  lookup[name] = resource;
}

export class ResourceRegistry {
	constructor(){
		this.attributes = {};
    this.elements = {};
    this.filters = {};
	}

	registerElement(tagName, behavior){
    register(this.elements, tagName, behavior, 'element');
  }

  getElement(tagName){
    return this.elements[tagName];
  }

  registerAttribute(attribute, behavior){
    register(this.attributes, attribute, behavior, 'attribute');
  }

  getAttribute(attribute){
    return this.attributes[attribute];
  }

  registerFilter(name, filter){
  	register(this.filters, name, filter, 'filter');
  }

  getFilter(name){
    return this.filters[name];
  }
}

export class ViewResources extends ResourceRegistry {
	constructor(parent){
		super();
		this.parent = parent;
    this.filterLookupFunction = this.getFilter.bind(this);
	}

  getElement(tagName){
    return this.elements[tagName] || this.parent.getElement(tagName);
  }

  getAttribute(attribute){
    return this.attributes[attribute] || this.parent.getAttribute(attribute);
  }

  getFilter(name){
    return this.filterLookup[name] ||  this.parent.getFilter(name);
  }
}