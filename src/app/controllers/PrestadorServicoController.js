import User from "../models/User";
import File from "../models/File";

class PrestadorServicoController {
    async index(req, res){
        const prestadorServico = await User.findAll({
            where: {prestador_servico: true},
            attributes: ["id", "name", "avatar_id"],
            include: [
                {
                    model: File,
                    as: "avatar",
                    attributes: ["name", "path", "url"],
                },
            ],
        });
        return res.json(prestadorServico);
    }
}

export default new PrestadorServicoController();