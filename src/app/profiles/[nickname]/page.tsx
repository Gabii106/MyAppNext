
interface Props{
    params : {
        nickname: string,
        texto: string
    }
}

export default function Profile({ params }: Props) {
    return (
      <div className="w-screen h-screen bg-gray-300 bg-opacity-60">
            <h1 className="text-xl font-bold mb-7"> PERFIL: {params.nickname} </h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae in illo vel quo non omnis id, 
                cum commodi iste! Dicta corporis labore magnam id exercitationem at ipsam esse, nesciunt ex.
            </p>
      </div>
    );
  }
  