import {Component, OnInit} from '@angular/core';
import {interval, Observable, of, Subscriber} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {filter, map} from 'rxjs/operators';


@Component({
    selector: 'app-root',
    imports: [AsyncPipe, ReactiveFormsModule],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App implements OnInit {

    letter: string = '';
    //helloWorld$!: Observable<string>;

    textFormControl = new FormControl('');

    text$ = this.textFormControl.valueChanges;


    ngOnInit(): void {
        const helloWorld$ = new Observable<string>((subscriber: Subscriber<string>) => {

            const greeting = 'Hello, World!';
            subscriber.next(greeting);
            //subscriber.complete();
        });
        const helloWorldObserver = {
            next: (value: string) => console.log(value),
            //error: (err: any) => console.error('Error: ', err),
            //complete: () => console.log('Observable completed')
        };
        helloWorld$.subscribe(helloWorldObserver);

        //Version simplifée avec 'of' pour créer l’observable directement,
        //sans passer par le constructeur
        const helloWorld2$ = of('Hello, World2!');
        helloWorld2$.subscribe((value: string) =>
            console.log(value)
        );

        const operatorFilter$ = of(1, 2, 3, 4, 5);

        operatorFilter$.pipe(filter((value) => {
                return value > 3
            }
        )).subscribe((value: any) => console.log('Filtered value: ', value));


        /*const interval$ = new Observable((observer) => {
            let count = 0;
            setInterval(() => {
                observer.next(count);
                count++;
            }, 3000)
        })*/

        const interval$ = interval(3000);
        interval$.subscribe((value) => console.log(value))

        const obs$ = of(1, 2, 3, 4, 5);
        obs$.pipe(
            map((value: number) => value * 2),
            filter((value: number) => value > 5)).subscribe((value: number) => console.log(value));


    }


    // protected readonly title = signal('Playground-Ng20');
}
