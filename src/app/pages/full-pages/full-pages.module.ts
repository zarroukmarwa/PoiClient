import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgImageSliderModule } from 'ng-image-slider';

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { ChartistModule} from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { HorizontalTimelineComponent } from './timeline/horizontal/component/horizontal-timeline.component';
import { VerticalTimelinePageComponent } from "./timeline/vertical/vertical-timeline-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';

import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignEditComponent } from './campaign-edit/campaign-edit.component';
import { ProductsComponent } from './products/products.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { CustomersComponent } from './customers/customers.component';
import { UsersComponent } from './users/users.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CampaignStatePipe } from "../../shared/pipes/campaign-state.pipe";
import { TagInputModule } from 'ngx-chips';
import { CampaignRealizationComponent } from './campaign-realization/campaign-realization.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        FormsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        ChartistModule,
        AgmCoreModule,
        NgxDatatableModule,
        TagInputModule,
        NgbModule,
        NgImageSliderModule,
        GoogleMapsModule
    ],
    declarations: [       
        GalleryPageComponent,
        InvoicePageComponent,       
        HorizontalTimelinePageComponent,
        HorizontalTimelineComponent,
        VerticalTimelinePageComponent,
        UserProfilePageComponent,
        SearchComponent,
        FaqComponent,
        KnowledgeBaseComponent,
        CampaignsComponent,
        CampaignEditComponent,
        ProductsComponent,
        ProductEditComponent,
        CustomersComponent,
        CustomerEditComponent,
        UsersComponent,
        CampaignStatePipe,
        CampaignRealizationComponent
    ]
})
export class FullPagesModule { }
