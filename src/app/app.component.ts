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

    columnDefs = [
        {headerName: 'Post ID', field: 'postId', checkboxSelection: true },
        {headerName: 'ID', field: 'id' },
        {headerName: 'User', field: 'name'},
        {headerName: 'Email', field: 'email'},
        {headerName: 'Comments', field: 'body'},        
    ];

    rowData: any;


    constructor(private http: HttpClient) {
    
    }
    
    ngOnInit() {
         this.rowData = this.http.get('https://jsonplaceholder.typicode.com/comments');
    }

    getSelectedRows() {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      const selectedData = selectedNodes.map( node => node.data );
      const selectedDataStringPresentation = selectedData.map( node => node.name + ' ' + node.email).join(', ');
      alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

   
}