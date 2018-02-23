import { Component } from "@angular/core";

@Component({
    selector: 'tsf-footer',
    template: `
<footer class="container-fluid">
    <div class="row">
        <div class="col-md-12 centered padded">Copyright 2017 ~ Center for Change in Transition Services</div>
    </div>
</footer>
`,
    styles: [`
.centered {
    text-align:center;
}
.padded {
    padding-top:50px;
}
`]
})
export class TsfFooterComponent {
}