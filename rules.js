class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text,choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            
            switch (choice.Target){
                case "treetrue":
                    if(bool_palo){
                        bool_fruit = true;
                        this.engine.gotoScene(Location, "treetrue");
                    }else{this.engine.gotoScene(Location, "treefalse")}
                    break;
                case "petdogtrue":
                    if(!bool_dog){this.engine.gotoScene(Location, "petdogtrue")}
                    else{this.engine.gotoScene(Location, "petdogfalse")}
                    break;
                case "getpalotrue":
                    if(!bool_palo){
                        bool_palo = true;
                        this.engine.gotoScene(Location, "getpalotrue");
                    }else{this.engine.gotoScene(Location, "getpalofalse")}
                    break;
                case "calldogtrue":
                    if(!bool_dog){
                        bool_dog = true;
                        this.engine.gotoScene(Location, "calldogtrue");
                    }else{this.engine.gotoScene(Location, "calldogfalse")}
                    break;
                case "baskettrue":
                    if(bool_fruit && bool_dog){this.engine.gotoScene(Location, "baskettrue")}
                    else{this.engine.gotoScene(Location, "basketfalse")}
                    break;
                default: this.engine.gotoScene(Location, choice.Target);
            }

            
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}
bool_palo = false;
bool_dog = false;
bool_fruit = false;
Engine.load(Start, 'myStory.json');