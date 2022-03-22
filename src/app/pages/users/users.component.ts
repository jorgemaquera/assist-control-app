import { Component, OnInit } from '@angular/core';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { User } from 'src/app/models/User';
import { PdfMakeService } from 'src/app/services/pdf-make.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'username',
    'email',
    'rol',
    'status',
    'actions',
  ];

  users: User[] = [];

  constructor(
    private userService: UserService,
    private pdfMakeService: PdfMakeService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  updateUser(id: number) {}

  deleteUser(id: number) {}

  generatePdf() {
    this.pdfMakeService.createPdf(this.getDocDefinition()).open();
  }

  getDocDefinition(): TDocumentDefinitions {
    return {
      content: [
        {
          table: {
            widths: ['*'],
            body: [
              [this.getHeader()],
              [
                {
                  margin: [30, 0],
                  layout: 'noBorders',
                  table: {
                    widths: ['*'],
                    body: [
                      [
                        {
                          text: 'Reporte de usuarios registrados',
                          style: 'title',
                        },
                      ],
                      [this.getUsersTable()],
                      [this.getFooter()],
                    ],
                  },
                },
              ],
            ],
          },
        },
      ],

      styles: {
        title: {
          fontSize: 20,
          bold: true,
          color: 'red',
          margin: 20,
          alignment: 'center',
        },
      },

      defaultStyle: {
        fontSize: 10,
      },

      pageSize: 'A4',

      pageOrientation: 'landscape',
      images: {
        logo: this.getDataUrlById('pdf-logo'),
        users: this.getDataUrlById('pdf-users'),
        signature: this.getDataUrlById('pdf-signature'),
      },
    };
  }

  getHeader(): any {
    return {
      layout: 'noBorders',
      table: {
        widths: ['auto', '*', 'auto'],
        body: [
          [{ image: 'logo', width: 200 }, null, { image: 'users', width: 60 }],
        ],
      },
    };
  }

  getFooter(): any {
    const time = new Date();
    const date = time.toLocaleString();
    return {
      margin: [0, 10],
      layout: 'noBorders',
      table: {
        widths: ['auto', '*', 'auto'],
        body: [
          [
            { image: 'signature', width: 100 },
            null,
            { text: `Fecha y hora: ${date}`, margin: [0, 25] },
          ],
        ],
      },
    };
  }

  getDataUrlById(id: string) {
    var imgToExport = document.getElementById(id) as any;
    var canvas = document.createElement('canvas');
    canvas.width = imgToExport.width;
    canvas.height = imgToExport.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(imgToExport, 0, 0);
    return canvas.toDataURL('image/png');
  }

  getUsersTable() {
    return {
      table: {
        headerRows: 1,

        widths: ['*', '*', '*', '*', '*'],

        body: [
          [
            { text: 'Id', bold: true, style: 'tableHeader' },
            { text: 'Usuario', bold: true, style: 'tableHeader' },
            { text: 'Email', bold: true, style: 'tableHeader' },
            { text: 'Rol', bold: true, style: 'tableHeader' },
            { text: 'Status', bold: true, style: 'tableHeader' },
          ],
          ...this.users.map((user) => [
            user.id,
            user.username,
            user.email,
            this.getRol(user.rol),
            this.getStatus(user.status),
          ]),
        ],
      },
    };
  }

  getStatus(status: boolean) {
    return status ? 'Activo' : 'Inactivo';
  }

  getRol(rol: number) {
    return rol === 1 ? 'Administrador' : 'Usuario';
  }
}
