import { useState, useEffect } from "react"
import { RepositoryItem } from "./RepositoryItem";

import '../style/repositories.scss';

//construção de informação de propriedade
// https://api.github.com/users/betolarbac/repos


export function RepositoryList () {
    const [repositories, setRepositories] = useState([])

    useEffect(() => {
        //estado preenchido e estado de repositorio consumindo da Api 
        fetch('https:api.github.com/users/betolarbac/repos')
        .then(response => response.json())
        .then(data => setRepositories(data))
    }, [])
    return (
        //importação de componentes para deixar o codigo mais limpo e separar por pedaços 
        <section className="repository-list">
            <h1>Lista de repositorio</h1>

            
            <ul>
                { repositories.map(repository => {
                    //sempre que usar o map colocar o key com a primeira propriedade do arquivos
                    return < RepositoryItem key={repository.name} repository={repository} />
                })}

            </ul>
        </section>
    );
}