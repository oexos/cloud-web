import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';

interface TechStackNode {
  name: string;
  children?: TechStackNode[];
}

const TREE_DATA: TechStackNode[] = [
  {
    name: 'Front-end',
    children: [
      { name: 'HTML' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'CSS' },
      { name: 'Angular 17' },
      { name: 'Angular Forms' },
      { name: 'Angular Router' },
      { name: 'Angular HttpClient' },
      { name: 'Angular Material' },
      { name: 'RxJS Observables' },
      { name: 'OAuth2 (npm angular-oauth2-oidc)' },
      { name: 'Node.js' },
    ],
  },
  {
    name: 'Back-end',
    children: [
      { name: 'Java' },
      { name: 'Spring Boot' },
      { name: 'Spring Framework' },
      { name: 'Spring Data JPA' },
      { name: 'Spring Cloud OpenFeign' },
      { name: 'Spring Security' },
      { name: 'SQL' },
      { name: 'JUnit' },
      { name: 'Mockito' },
    ],
  },
  {
    name: 'Microservices',
    children: [
      { name: 'Docker' },
      { name: 'Kubernetes' },
      { name: 'Istio' },
      { name: 'OAuth2/JWT' },
      { name: 'Git' },
      { name: 'Gitlab CI/CD' },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.css',
})
export class TechStackComponent {
  private _transformer = (node: TechStackNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
