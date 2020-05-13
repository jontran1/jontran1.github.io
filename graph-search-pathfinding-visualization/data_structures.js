// Copied from geeksforgeeks site.
class Queue {
    constructor(maxSize) {
        console.log("constructor");
       // Set default max size if not provided
       if (isNaN(maxSize)) {
          maxSize = 10;
       }
       this.maxSize = maxSize;
       // Init an array that'll contain the queue values.
       this.container = [];
     }
    // Helper function to display all values while developing
    display() {
       console.log(this.container);
    }
    // Checks if queue is empty
    isEmpty() {
       return this.container.length === 0;
    }
    // checks if queue is full
    isFull() {
       return this.container.length >= this.maxSize;
    }
    enqueue(element) {
       // Check if Queue is full
       if (this.isFull()) {
          console.log("Queue Overflow!"); return;
       }
       // Since we want to add elements to end, we'll just push them.
       this.container.push(element);
    }
    dequeue() {
       // Check if empty
       if (this.isEmpty()) {
          console.log("Queue Underflow!");
          return;
       }
       return this.container.shift();
    }
    peek() {
       if (this.isEmpty()) {
          console.log("Queue Underflow!");
          return;
       }
       return this.container[0];
    }
    clear() {
       this.container = [];
    }
 }

 class QElement {
    constructor(element, priority){
       this.element = element;
       this.priority = priority;
    }
 }

 class PriorityQueue{

   constructor(){
      this.items = [];
   }

   enqueue(element, priority){

      var qElement = new QElement(element, priority);
      var contain = false;


      for(var i = 0; i < this.items.length; i++){
         if(this.items[i].element === element && this.items[i].priority === priority) break;
         if(this.items[i].priority > qElement.priority){
            this.items.splice(i, 0, qElement);
            contain = true;
            break;
         }
      }

      if(!contain){
         this.items.push(qElement);
      }
   }

   dequeue(){
      if(this.isEmpty()){
         return undefined;
      }
      return this.items.shift();
   }

   front(){
      if(this.isEmpty()) return undefined;
      return this.items[0];
   }

   isEmpty(){
      return this.length == 0;
   }

   printPriorityQueue(){
      var str = "";
      for(var i = 0; i < this.items.length; i++){
         str += this.items[i].element + " ";
      }
      return str;
   }

 }