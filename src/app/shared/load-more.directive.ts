import { AfterViewInit, Directive, ElementRef, Host, input, output } from "@angular/core";

@Directive({
    selector: '[appLoadMoreDirective]',
    standalone: true
})
export class LoadMoreDirective implements AfterViewInit {
    private _observer!: IntersectionObserver;
    options = input<IntersectionObserverInit>();
    isLastItem = input(false);
    shouldLoadMore = output<void>();

    constructor(@Host() private _elementRef: ElementRef) {}

    ngAfterViewInit(): void {
        if (this.isLastItem()) {
            this._observer = new IntersectionObserver(this._callback, this.options());
            this._observer.observe(this._elementRef.nativeElement);
        }
    }

    private _callback: IntersectionObserverCallback = (entries, observer) => {
        const entry = entries[0];
        console.log(entry?.isIntersecting ? 'Estoy visible' : 'Estoy escondido');
        if (entry?.isIntersecting) {
            this.shouldLoadMore.emit();
            observer.unobserve(entry.target);
        }
    }
}