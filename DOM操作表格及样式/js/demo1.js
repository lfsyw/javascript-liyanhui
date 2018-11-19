/*
    thead标签在一个表格里只能有一个
    tfoot标签在一个表格里只能有一个
    tbody标签在一个表格里有N个
    caption标签，在表格里只能有一个
    tr标签，在一个表格里可以有N个
    td和th标签，在一个表格里可以有N个

    使用DOM来创建一个表格
    var table = document.createElement('table'); //创建table节点
    table.width = 300;
    table.border = 1;


    var caption = document.createElement('caption'); //创建caption节点
    table.appendChild(caption); //将caption节点添加到table中
    caption.innerHTML = '人员表'; //向caption中添加内容

    var captionText = document.createTextNode('3232'); //创建一个文本节点
    caption.appendChild(captionText); //将文本节点添加到caption中
    caption.normalize(); //合并同一级别的文本节点

    var thead = document.createElement('thead'); //创建表头
    table.appendChild(thead);  //将表头添加到表格中

    var tr = document.createElement('tr'); //创建tr节点
    thead.appendChild(tr); //将tr节点添加到thead节点中

    var th = document.createElement('th'); //创建th节点
    tr.appendChild(th);

    var thText = document.createTextNode('数据1'); //创建文本节点
    th.appendChild(thText);

    var th2 = document.createElement('th');
    tr.appendChild(th2);
    var thText1 = document.createTextNode('数据2');
    th2.appendChild(thText1);

    var th3 = document.createElement('th');
    tr.appendChild(th3);
    th3.appendChild(document.createTextNode('数据3'));

    document.body.appendChild(table);

    使用DOM去获取表格数据
    var table = document.getElementsByTagName('table')[0];
    //获取“人员表”
    alert(table.children[0].innerHTML); //人员表 ,不清晰
    // 获取“女”
    alert(table.children[2].children[1].children[1].innerHTML); //女,超级烦，很不清晰

    var tbody = table.getElementsByTagName('tbody')[0]; //获取table下的tbody节点
    var tr = tbody.getElementsByTagName('tr')[1];  //获取tbody下的tr节点
    var td = tr.getElementsByTagName('td')[1];  //获取tr下的td节点
    alert(td.innerHTML); //女 比较清晰，但超级烦

    HTML DOM 给元素标签提供了一些属性和方法
    alert(table.caption.innerHTML);  //清晰，方便，简单
    table.caption.innerHTML='jlkjl';  //修改caption内容
    alert(table.tHead); //[object HTMLTableSectionElement]
    alert(table.tBodies[0]); //[object HTMLTableSectionElement]
    alert(table.rows.length); //得到所有tr的行数
    alert(table.tBodies[0].rows.length);
    alert(table.tBodies[0].rows[0]);  //[object HTMLTableRowElement]
    alert(table.tBodies[0].rows[0].cells.length); //获取tbody第一行的列的个数

    alert(table.tBodies[0].rows[1].cells[1].innerHTML);		//很清晰，很方便

    table.deleteCaption();
    table.deleteTHead();
    
    table.tBodies[0].deleteRow(0);
	table.tBodies[0].rows[0].deleteCell(1);
*/

window.onload = function() {
    var table = document.createElement('table');
    table.width = 300;
    table.border = 1;
    table.createCaption().innerHTML = '人员表';
   
    var thead = table.createTHead();
    var tr = thead.insertRow(0);
    tr.insertCell(0).innerHTML='数据1';
	tr.insertCell(1).innerHTML = '数据2';
	tr.insertCell(2).innerHTML = '数据3';

    document.body.appendChild(table);

}