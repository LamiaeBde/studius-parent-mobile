import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { IonTabs } from "@ionic/angular";
import { Console } from "console";
import { AuthService } from "src/app/core/auth/auth.service";
import { SharedService } from "src/app/core/service/shared.service";



@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['./admin.component.scss'],
  })
export class AdminCompoenent implements OnInit {
     
  @ViewChild('tabs', {static: false}) tabs!: IonTabs;
  selectedTab: any;
  pageTitle = '';

    imgsrc!: any;
    show_tab: boolean = true;
    show_header: boolean = true;
    hideTabs!: boolean;
    constructor(private service: AuthService, private router: Router,private route: ActivatedRoute,public sharedService: SharedService
        ) {  route.url.subscribe(() => {
            console.log(route?.snapshot?.data);
           });  }

    ngOnInit(): void {
        this.imgsrc = localStorage.getItem('profileImge');
       
      
        this.sharedService.reset();

    }

  



  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
    console.log(this.selectedTab);
  }
    ShowDetails(username: any) {

        //     this.service.getProfile().subscribe((response) => {




        //   });
    }
    changeTitle(title :string):void {
      this.pageTitle= title;
  }

  onTabChanged(event: any) {
    const activeTab = event.tab;
    if (activeTab === 'dashboard') {
      this.pageTitle = 'Dashboard';
    } else if (activeTab === 'actualite') {
      this.pageTitle = 'Actualite';
    } else if (activeTab === 'orientation') {
      this.pageTitle = 'Orientation';
    }
    else if (activeTab === 'etablissement') {
      this.pageTitle = 'Classes';
    }
    
  }
    desconnexion() {
        sessionStorage.clear();

        localStorage.clear();
        this.router.navigate(['auth/home'])
    }


}