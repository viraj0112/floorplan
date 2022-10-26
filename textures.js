
import graphImg from './images/graph.jpg';

import { TextureLoader, NearestFilter, LinearMipMapLinearFilter  } from 'three';


export const graph = new TextureLoader().load(graphImg);


graph.magFilter = NearestFilter;
graph.minFilter = LinearMipMapLinearFilter;
