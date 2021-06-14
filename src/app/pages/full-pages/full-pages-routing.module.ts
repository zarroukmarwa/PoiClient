import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { VerticalTimelinePageComponent } from "./timeline/vertical/vertical-timeline-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';

import { CampaignsComponent } from "./campaigns/campaigns.component";
import { CampaignEditComponent } from "./campaign-edit/campaign-edit.component";
import { ProductsComponent } from "./products/products.component";
import { CustomersComponent } from "./customers/customers.component";
import { CampaignRealizationComponent } from './campaign-realization/campaign-realization.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { ActionsComponent } from './actions/actions.component';
import { RolesComponent } from './roles/roles.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { ActionEditComponent } from './action-edit/action-edit.component';
import { ActionAffectationComponent } from './action-affectation/action-affectation.component';
import { ActionAffectationEditComponent } from './action-affectation-edit/action-affectation-edit.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'user'
        }
      },
      { path: "user", component: UsersComponent },
      { path: "user/:id", component: UsersComponent },
      {
        path: 'campaigns',
        component: CampaignsComponent,
        data: {
          title: 'campaigns'
        }
      },
      { path: "campaign", component: CampaignEditComponent },
      { path: "campaign/:id", component: CampaignEditComponent },
      { path: "campaignRealiazation/:id", component: CampaignRealizationComponent },
      {
        path: 'editcampaign',
        component: CampaignEditComponent,
        data: {
          title: 'editcampaign'
        }
      },
      {
        path: 'customers',
        component: CustomersComponent,
        data: {
          title: 'customers'
        }
      },
      { path: "customer", component: CustomerEditComponent },
      { path: "customer/:id", component: CustomerEditComponent },
      {
        path: 'products',
        component: ProductsComponent,
        data: {
          title: 'products'
        }
      }, 
      { path: "product", component: ProductEditComponent },
      { path: "product/:id", component: ProductEditComponent },
      {
        path: 'actions',
        component: ActionsComponent,
        data: {
          title: 'actions'
        }
      }, 
      { path: "affectations", component: ActionAffectationComponent },
      { path: "affectation", component: ActionAffectationEditComponent },
      { path: "affectation/:id", component: ActionAffectationEditComponent },

      { path: "action", component: ActionEditComponent },
      { path: "action/:id", component: ActionEditComponent },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: 'roles'
        }
      }, 
      { path: "role", component: RoleEditComponent },
      { path: "role/:id", component: RoleEditComponent },
      {
        path: 'gallery',
        component: GalleryPageComponent,
        data: {
          title: 'Gallery Page'
        }
      },
      {
        path: 'invoice',
        component: InvoicePageComponent,
        data: {
          title: 'Invoice Page'
        }
      },      
      {
        path: 'horizontaltimeline',
        component: HorizontalTimelinePageComponent,
        data: {
          title: 'Horizontal Timeline Page'
        }
      },
      {
        path: 'verticaltimeline',
        component: VerticalTimelinePageComponent,
        data: {
          title: 'Vertical Timeline Page'
        }
      },
      {
        path: 'profile',
        component: UserProfilePageComponent,
        data: {
          title: 'User Profile Page'
        }
      },
      {
        path: 'search',
        component: SearchComponent,
        data: {
          title: 'Search'
        }
      },
      {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'FAQ'
        }
      },
      {
        path: 'kb',
        component: KnowledgeBaseComponent,
        data: {
          title: 'Knowledge Base'
        }
      }  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
