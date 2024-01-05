//excel diamension
const rows=100;
const columns =26;

//elements
const tHeadRows=document.getElementById("table-heading-row");
const tBody =document.getElementById("table-body");
const currentcellheading = document.getElementById("current-cell");
//excel Buttons...
const boldbtn =document.getElementById("bold-btn");
const italicbtn = document.getElementById("italic-btn");
const underLinebtn = document.getElementById("underLine-btn");
const leftbtn  =  document.getElementById("left-btn");
const centerbtn  =  document.getElementById("center-btn");
const rightbtn  =  document.getElementById("right-btn");
const copybtn  =  document.getElementById("copy-btn");
const cutbtn  =  document.getElementById("cut-btn");
const pastebtn  =  document.getElementById("paste-btn");
const upload =  document.getElementById("upload");
//Excel dropdown 
const fontFamilyDropdown =document.getElementById("font-style-dropdown");
const fontSizeDropdown =document.getElementById("font-size-dropdown");
//Excel Color  
const bgColorSelector =document.getElementById("bgColor");
const FontColorSelector =document.getElementById("fontColor");
//variables to save cache
let prevCellId ;
let currentCell;
let cutCell;
let lastPressesButton;
let matrix =new Array(rows);

for(let row =0 ;  row<rows; row++){
    matrix[row]=new Array(columns);

    for (let col =0 ;col < columns ;col++){
              matrix[row][col]= {};
         }
    }


//we want to avoid repetation  of code of colums cell thats why we add function here....(commentet part)
function colGen(typeOfCell,tableRow,isInnerText,rowNumber){
for(let col=0;col< columns ;col++){
    const cell= document.createElement(typeOfCell);
    if(isInnerText){
        cell.innerText= String.fromCharCode(col+65);
       
        cell.setAttribute('id', String.fromCharCode(col+65)); // now what next --i need to gives id to my ths 
       /* its only to check ths id passed or not in console..
       
       cell.addEventListener('focus',event => 
         console.log(event.target.id));
        cell.setAttribute('contenteditable','true');
        */
}
    
    // now we clicking  on any cell it gives cell name with number for example: c1,A2 like that
// what i do now == we need to give id // we use attribute in td is "contenteditable"" and it gives true value
    else{
              //cell.setAttribute('id','testing set')
      // cell.setAttribute('id',${col});//for this i got column only like 1,2,3...
            //cell.setAttribute('id',${String.fromCharCode(col+65)})   for this i got column only like A,B,C...
            
            //but i want row and colmn both then 
            cell.setAttribute('id',`${String.fromCharCode(col+65)}${rowNumber}`) //here we add A1,B4,C5....like that
            cell.setAttribute('contenteditable','true');
            cell.addEventListener('focusout',() => updateObjectInMatrix());
              //key value
              cell.addEventListener('focus',event => onFocusFunction(event.target.id)
              // console.log(event.target.id);
              );
    }
    tableRow.append(cell);
}
}
//Due to the repetation of colors code thas why we add one function
function setCellHeadColor(colId,rowId,color){
    const colHead =document.getElementById(colId);
    //console.log(colHead);
    const rowHead=document.getElementById(rowId); //which row is Selected 
    //console.log(rowHead);
    colHead.style.backgroundColor=color;
    rowHead.style.backgroundColor=color;  
}
function onFocusFunction(cellId){

    currentCell = document.getElementById(cellId);
    //console.log(prevCellId);
    if(prevCellId){
        /*
        const colHead =document.getElementById(prevCellId[0]);
        //console.log(colHead);
        const rowHead=document.getElementById(prevCellId.substring(1)); //which row is Selected 
        //console.log(rowHead);
        colHead.style.backgroundColor='transparent';
        rowHead.style.backgroundColor='transparent';  
/// this colors code for color given to rows or columns when they Selected
*/

//here we pass setCellColor Function
setCellHeadColor(prevCellId[0],prevCellId.substring(1),'transparent');
    }
    
    currentcellheading.innerText = cellId + ' '+ 'selected'; // we get here which cell selected

    /*
const colHead =document.getElementById(cell.id[0]);
//console.log(colHead);
const rowHead=document.getElementById(cell.id.substring(1)); //which row is Selected 
//console.log(rowHead);
colHead.style.backgroundColor='#ddddff';
rowHead.style.backgroundColor='#ddddff'; /// this colors code for color given to rows or columns when they Selected


*/
setCellHeadColor(cellId[0],cellId.substring(1),'#ddddff');
// here my cellId becomes a prevcell Id
prevCellId = cellId;
//console.log(prevCellId);


updateObjectInMatrix(); // call update matrix function
}
//function for update sheet
function updateObjectInMatrix(){
    let id = currentCell.id;
    let tempObj ={
         id:id,
         text:currentCell.innerText,
         style:currentCell.style.cssText,

    }
    //colrow
   
    let col = id[0].charCodeAt(0)-65;
    let row = id.substr(1)-1;
    //console.log(row,col)
    matrix[row][col]=tempObj;
}



colGen('th',tHeadRows,true)

/*
for(let col=0;col< columns ;col++){
    const thead= document.createElement('th');
    thead.innerText=String.fromCharCode(col+65);
    tHeadRows.append(thead);
//but now we need to add Alphabets not a number thats why we need to add  some logic here.....
//what i do now ? 
//0 ->65-A, 1->66-B ,2->67-C ,3->68-D ....  can we add with ASCII Values == using this method  String.fromCharCode(col +65)
}
*/
for(let row=1; row<=rows; row++){
    const trow =document.createElement('tr');
    const th =document.createElement('th');
    th.innerText=row;
    th.setAttribute('id',row) // now what next --i need to gives id to my ths 
    trow.append(th);
    //append 26 times tds
   /*
    for(let col =0;col<columns;col++){
        const td =document.createElement('td');
        trow.append(td); //td add in tr here.........// also here code is repeated of column thats why we need to create function
    }
 */

    // here we need to pass row also 
   colGen('td',trow,false,row)  //for row got to function
    tBody.append(trow);
    // in that we add 100 rows  now we need to add td in 26 times (Empty cells)
    // how i add this 26 tds?
}

// when i clicked on my bold button my current cell should get bold style

boldbtn.addEventListener('click',()=>{
    
        if (currentCell.style.fontWeight === 'bold') {
            currentCell.style.fontWeight = 'normal';
            boldbtn.style.backgroundColor ='transparent';
            boldbtn.style.color='black';
        } else {
            currentCell.style.fontWeight = 'bold'; //now if i making my cell as bold i want background color
            boldbtn.style.backgroundColor ='blue';
            boldbtn.style.color='white';
        }
        updateObjectInMatrix();
});

// when i clicked on my italic button my current cell should get italic style
italicbtn.addEventListener('click',()=>{

    if(currentCell.style.fontStyle  === 'italic'){
        currentCell.style.fontStyle  = 'normal';
        italicbtn.style.backgroundColor ='transparent';
        italicbtn.style.color='black';
    }else{
        currentCell.style.fontStyle  = 'italic';
        italicbtn.style.backgroundColor ='blue';
        italicbtn.style.color='white';
    }
    updateObjectInMatrix();
});

// // when i clicked on my italic button my current cell should get italic style
underLinebtn.addEventListener('click',()=>{
    
    if (currentCell.style.textDecoration === 'underline') {
        currentCell.style.textDecoration = 'none';
        underLinebtn.style.backgroundColor = 'transparent';
        underLinebtn.style.color = 'black';
    } else {
        currentCell.style.textDecoration = 'underline';
        underLinebtn.style.backgroundColor = 'blue';
        underLinebtn.style.color = 'white';
    }
    updateObjectInMatrix();
});
// avoiding code complexity for bold,italic and underlinebutton .....we make function
//......................remains ................
 
leftbtn.addEventListener('click',()=>{
    currentCell.style.textAlign='left';
    updateObjectInMatrix();
});
//center Button =>
centerbtn.addEventListener('click',()=>{
currentCell.style.textAlign='center';
updateObjectInMatrix();
});
//right Button =>
rightbtn.addEventListener('click',()=>{
    currentCell.style.textAlign='right';
    updateObjectInMatrix();
});
 
//font Family DropDown
fontFamilyDropdown.addEventListener('change',()=>{
currentCell.style.fontFamily = fontFamilyDropdown.value;
updateObjectInMatrix();
});

//font Size DropDown
fontSizeDropdown.addEventListener('change',()=>{
    currentCell.style.fontSize= fontSizeDropdown.value;
    updateObjectInMatrix();
    });

    //Text -Color And BG -color
    //input has better Ux and input is very heavy event Listener
   bgColorSelector.addEventListener('input',()=>{
    currentCell.style.backgroundColor = bgColorSelector.value;
    updateObjectInMatrix();
        });
   FontColorSelector.addEventListener('input',()=>{
            currentCell.style.color = FontColorSelector.value;
            updateObjectInMatrix();
                });

                //implements copy,cut ,paste 
                
                cutbtn.addEventListener('click',()=>{
                    lastPressesButton = 'cut';
                 cutCell={
                    text: currentCell.innerText,
                    style: currentCell.style.cssText,
                 }
                    currentCell.innerText='';
                    currentCell.style.cssText='';
                    //style -> its an object which store all the properties in an object
                    //cssText -> property of style object which saves my style properties
                    //in text (short form of style)
                    updateObjectInMatrix();
                });

                copybtn.addEventListener('click',()=>{
                    lastPressesButton = 'copy';
                    cutCell={
                        text: currentCell.innerText,
                        style: currentCell.style.cssText,
                     }
                       
                });


                pastebtn.addEventListener('click',()=>{
                    currentCell.innerText=cutCell.text;
                    currentCell.style.cssText=cutCell.style;
                    if(lastPressesButton==='cut'){
                        cutCell = undefined;

                    }
                    updateObjectInMatrix();
                });

                //download of sheet 

                function downloadMatrix(){
                    //console.log("testing");
                    const matrixString =JSON.stringify(matrix);
                    //memory out of my matrixString
                    const blob = new Blob([matrixString],{type: 'application/json'});
                     
                    const link =document.createElement('a');
                    //convert my blob to link href(url)
                    link.href =URL.createObjectURL(blob);
                    //matrix->Stringify->blob->url
                    link.click();
                }
            //Upload 
             upload.addEventListener('input',uploadMatrix);

             function uploadMatrix(event){
                const file =event.target.files[0];
               if(file){
                const reader = new FileReader();
            
                reader.readAsText(file);//this is trigger
                //this reader should covert my blob into js code
                reader.onload = function(event){
                    const filecontent =JSON.parse(event.target.result);
                    console.log(filecontent);
                }
                   //this reader is inbuilt instance of fileReaderClass
                           }
             }