import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridNg2;
  
    title = 'Comments Testing From An External API';
    defaultColDef;

    // define the grid headers   
    columnDefs = [
        {headerName: 'Post ID', field: 'postId', checkboxSelection: true },
        {headerName: 'ID', field: 'id', rowDrag: true },
        {headerName: 'User', field: 'name', rowDrag: true},
        {headerName: 'Email', field: 'email'},
        {headerName: 'Comments', field: 'body'},        
    ];
    // establish the return data type
    rowData: any;

    constructor(private http: HttpClient) {
    
    }
    
    ngOnInit() {
        // the external api call
         this.rowData = this.http.get('https://jsonplaceholder.typicode.com/comments');
         this.defaultColDef = { editable: true };
        }

    // showing the users the data in the selected rows
    //  a more desireable approach will be to use a toast instead of an alert
    getSelectedRows() {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      const selectedData = selectedNodes.map( node => node.data );
      const selectedDataStringPresentation = selectedData.map( node => node.name + ' ' + node.email).join(', ');
      alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

   
}